## `Problem Definition`

Backend

- Please develop Backend System in NodeJs, you can use any Backend Framework that run on Node also

- The system can connected to any persistent data storage like RDBMS (PostgreSQL, MySQL, etc.) , NoSQL or sqlite

- Goal: Deposit and withdrawal system it should consist of following functionality, you can use RestApi or GraphQL

- Register new User (should return with user Id of created user and account balance which should be 0)

- Deposit API should accept amount to deposit and user Id, then return with the total amount that this user has after deposit. Check also if user Id is valid

- Withdrawal API should accept amount to withdraw and user Id, then return with the total amount that this user has after withdraw. Check also if user Id is valid

- The system should not allow user to over withdraw (user balance cannot be negative)

- The system should support decimal number for deposit and withdraw

### `start`

```
npm start
# or
yarn start
```

### `Instructions`

- Copy the contents of .env.example to .env , and add your credentials
