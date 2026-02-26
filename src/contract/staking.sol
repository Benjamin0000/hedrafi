// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHederaTokenService { 
    function transferToken(
        address token,
        address sender,
        address receiver,
        int64 amount
    ) external returns (int responseCode);

    function associateToken(address account, address token) external returns (int responseCode);
}

int constant HEDERA_SUCCESS = 22;

contract HedrafiGenesisFarm {

    IHederaTokenService constant HTS = IHederaTokenService(address(0x167));

    uint256 constant INT64_MAX = 9223372036854775807;
    uint256 constant PRECISION = 1e18;

    address public immutable admin;
    address public immutable rewardToken;

    uint256 public immutable startTime;
    uint256 public immutable endTime;
    uint256 public immutable totalRewardPool;

    uint256 public rewardPerSecond;
    uint256 public lastRewardTime; 
    uint256 public accRewardPerShare;

    uint256 public totalStakedHBAR;
    uint256 public totalRewardDistributed;
    uint256 public totalUsers;
    bool private locked;

    mapping(address => uint256) public pendingWithdrawals;
    mapping(address => uint256) public claimedReward; 

    struct UserInfo {
        uint256 amount;      
        uint256 rewardDebt;  
    }

    mapping(address => UserInfo) public users;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount);

    modifier farmStarted() {
        require(block.timestamp >= startTime, "Farm not started");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "No reentrancy"); 
        locked = true; 
        _; 
        locked = false; 
    }

    constructor(
        address _rewardToken,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _totalRewardPool
    ) {
        require(_rewardToken != address(0), "Invalid token");
        require(_endTime > _startTime, "Invalid time");
        require(_totalRewardPool > 0, "Invalid reward pool");

        admin = msg.sender;
        rewardToken = _rewardToken;
        startTime = _startTime;
        endTime = _endTime;
        totalRewardPool = _totalRewardPool;

        rewardPerSecond = _totalRewardPool / (_endTime - _startTime);
        lastRewardTime = _startTime;
    }

    function updatePool() internal {
        if (block.timestamp <= lastRewardTime) return;

        if (totalStakedHBAR == 0) {
            lastRewardTime = block.timestamp;
            return;
        }

        uint256 currentTime = block.timestamp > endTime ? endTime : block.timestamp;

        if (currentTime <= lastRewardTime) return;

        uint256 timeElapsed = currentTime - lastRewardTime;
        uint256 reward = timeElapsed * rewardPerSecond;

        if (totalRewardDistributed + reward > totalRewardPool) {
            reward = totalRewardPool - totalRewardDistributed;
        }

        totalRewardDistributed += reward;
        accRewardPerShare += (reward * PRECISION) / totalStakedHBAR;

        lastRewardTime = currentTime;
    }

    function stake() external payable farmStarted {
        require(msg.value > 0, "Zero stake");

        updatePool();

        UserInfo storage user = users[msg.sender];

        if (user.amount > 0) {
            uint256 pending = (user.amount * accRewardPerShare) / PRECISION - user.rewardDebt;
            if (pending > 0) {
                _safeRewardTransfer(msg.sender, pending);
                emit Claimed(msg.sender, pending);
            }
        } else {
            totalUsers++;
        }

        user.amount += msg.value;
        totalStakedHBAR += msg.value;

        user.rewardDebt = (user.amount * accRewardPerShare) / PRECISION;

        emit Staked(msg.sender, msg.value);
    }

    function unstake(uint256 amount) external nonReentrant {
        UserInfo storage user = users[msg.sender];
        require(user.amount >= amount, "Insufficient stake");

        updatePool();

        uint256 pending = (user.amount * accRewardPerShare) / PRECISION - user.rewardDebt;
        if (pending > 0) {
            _safeRewardTransfer(msg.sender, pending);
            emit Claimed(msg.sender, pending);
        }

        user.amount -= amount;
        totalStakedHBAR -= amount;

        user.rewardDebt = (user.amount * accRewardPerShare) / PRECISION;

        (bool s, ) = payable(msg.sender).call{value: amount}("");
        if (!s) {
            pendingWithdrawals[msg.sender] += amount;
        }

        emit Unstaked(msg.sender, amount);
    }

    function claim() external {
        updatePool();

        UserInfo storage user = users[msg.sender];

        uint256 pending = (user.amount * accRewardPerShare) / PRECISION - user.rewardDebt;
        require(pending > 0, "No rewards");

        user.rewardDebt = (user.amount * accRewardPerShare) / PRECISION;

        _safeRewardTransfer(msg.sender, pending);

        emit Claimed(msg.sender, pending);
    }

    function pendingReward(address _user) external view returns (uint256) {
        UserInfo storage user = users[_user];
        uint256 tempAcc = accRewardPerShare;

        if (block.timestamp > lastRewardTime && totalStakedHBAR != 0) {
            uint256 currentTime = block.timestamp > endTime ? endTime : block.timestamp;
            uint256 timeElapsed = currentTime - lastRewardTime;
            uint256 reward = timeElapsed * rewardPerSecond;

            if (totalRewardDistributed + reward > totalRewardPool) {
                reward = totalRewardPool - totalRewardDistributed;
            }

            tempAcc += (reward * PRECISION) / totalStakedHBAR;
        }

        return (user.amount * tempAcc) / PRECISION - user.rewardDebt;
    }

    function _safeRewardTransfer(address to, uint256 amount) internal {
        require(amount <= INT64_MAX, "Overflow");
        int64 amt = int64(int256(amount));
        int response = HTS.transferToken(rewardToken, address(this), to, amt);
        require(response == HEDERA_SUCCESS, "HTS transfer failed");
        claimedReward[to] += amount; 
    }

    function associateSelf(address token) external returns (int) {
        require(msg.sender == admin, "Only admin");
        int response = HTS.associateToken(address(this), token);
        require(response == HEDERA_SUCCESS, "Association failed");
        return response;
    }

    function withdrawFunds() external {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        pendingWithdrawals[msg.sender] = 0;

        (bool s, ) = payable(msg.sender).call{value: amount}("");
        require(s, "Withdrawal failed");
    }
}