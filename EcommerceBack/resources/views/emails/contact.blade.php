<x-mail::message>
# Hello
I'm {{ $emailData['name'] }} 
{{ $emailData['email'] }}

{{ $emailData['message'] }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
