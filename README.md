#How to run
1) Clone this repository
2) Have node installed
3) run "npm i" and then "npm run start"
4) Visit http://localhost:3000 on your browser

An investor may receive a refund on their investment into a fund based on specific time limits, which vary depending on whether the requester had signed up to the old or new Terms of Service (TOS) and whether the reversal request was submitted via the phone or on the web-app.

| Request Type | Approval time limit for old TOS | Approval time limit for new TOS |
| ------------ | ------------------------------- | ------------------------------- |
| On the phone | 4 hours after investment        | 8 hours after investment        |
| Web app      | 8 hours after investment        | 16 hours after investment       |

**Note**: US customers follow the date format MONTH/DAY/YEAR, whereas Europeans use DAY/MONTH/YEAR. An investor is subject to the new TOS if they signed up after 1/2/2020 for US customers and after the equivalent date of 2/1/2020 for Europeans.

The table below gives you a list of customers' reversal requests.

| Name             | Customer Location | Sign up date | Request Source | Investment Date | Investment Time | Refund Request Date | Refund Request Time |
| ---------------- | ----------------- | ------------ | -------------- | --------------- | --------------- | ------------------- | ------------------- |
| Emma Smith       | US                | 1/2/2020     | phone          | 1/2/2021        | 06:00           | 1/2/2021            | 09:00               |
| Benjamin Johnson | Europe            | 12/2/2020    | web app        | 2/1/2021        | 06:30           | 1/2/2021            | 23:00               |
| Olivia Davis     | Europe            | 1/2/2020     | web app        | 2/2/2021        | 13:00           | 2/2/2021            | 20:00               |
| Ethan Anderson   | US                | 1/11/2011    | web app        | 2/1/2021        | 13:00           | 2/2/2021            | 16:00               |
| Sophia Wilson    | US                | 2/1/2020     | phone          | 2/1/2021        | 22:00           | 2/2/2021            | 5:00                |
| Liam Martinez    | Europe            | 1/1/2020     | web app        | 1/1/2021        | 11:00           | 11/1/2021           | 12:00               |

Write a small front end application that will take in the data in the table above and display whether each refund request should be approved or denied. The emphasis of the application should be on solving the problem, and much less on the architecture, design, etc.
