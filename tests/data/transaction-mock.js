let depositBody = {
    type: "deposit",
    userId: 1,
    amount: 1000
}

let withdrawBody = {
    type: "withdraw",
    userId: 1,
    amount: 500
}

module.exports = {
    depositBody,
    withdrawBody
}