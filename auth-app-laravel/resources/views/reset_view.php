<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="_token" content="{!! csrf_token() !!}" />
    </head>

    <body >
        <!-- <form method="POST" action="/reset"> -->
        <form method="post" action="{{ route('reset') }}">
            @csrf
            <p>
                Please enter your email and new password
            </p>
            <input type="hidden" name="_token" value="{!! csrf_token() !!}">
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
