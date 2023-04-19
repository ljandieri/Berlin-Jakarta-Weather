const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .table {
        width: 100%;
        background: linear-gradient(to bottom right, #3faebf 0%, #6f5c8a 99%);
        padding: 24px;
        border-collapse: separate;
        border-spacing: 12px;
      }

      .table__header {
        color: #ffffff;
        font-size: 24px;
        text-align: center;
      }

      .date_header{
        width: 10%;
      }
      .date {
        width: 10%;
        align-text: center;
        font-size: 18px;
        text-transform: uppercase;
        color: #ffffff;
      }
      .date > div{
        text-align: center;
        width: 100%;
      }

      .weather-card {
        background: rgba(255, 255, 255, 0.6);
        padding: 12px 0px;
        border-radius: 6px;
        display: flex;
        height: 100px;
        box-shadow: rgba(149, 157, 165, 0.7) 0px 8px 24px;
        color: #35495e;
        font-size: 16px;
      }

      .container {
        padding: 0 12px;
        display: flex;
        width: 25%;
        text-align: center;
      }

      .temperature {
        text-align: center;
        margin-right: 12px;
      }

      .label {
        text-align: center;
      }

      .number {
        font-size: 24px;
        margin-bottom: 0px;
      }

      .content-box {
        width: 100%;
        text-align: center;
      }
      .icon {
        width: 30px;
        height: 30px;
      }

      .footer{
        padding: 6px;
        background: #35495e;
        font-size: 10px;
        color: white;
      }
      .footer > a{
        color: white
      }
    </style>
  </head>
  <body>
    <h1>
    Greetings, here is your weather update for Berlin and Jakarta for the next 14 days:
    </h1>
    <table class="table">
      <tr class="table__header">
        <th class="date_header">Date</th>
        <th>Berlin</th>
        <th>Jakarta</th>
      </tr>
      [TABLE_DATA_PLACEHOLDER]
    </table>
    <footer class="footer">Weather icon images used from https://www.flaticon.com/</footer>
  </body>
</html>
`
module.exports = template