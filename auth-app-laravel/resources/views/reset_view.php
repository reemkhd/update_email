<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body >
        <form method="PATCH" action="{{ route('reset') }}">
            <p>
                Please enter your new password
            </p>
            <item>
                <label position="floating">Email</label>
                <input type="email" name="email"></input>
            </ion-item>
            <br>
            <item>
                <label position="floating">new password</label>
                <input type="password" name="password"></input>
            </item>
            <br>
            <!-- <item>
                <label position="floating">conf password</label>
                <input type="password" name="password"></input>
            </item> -->
            <br>

            <button type="submit" expand="full" color="primary">Reset</button>
        </form>
    </body>
</html>