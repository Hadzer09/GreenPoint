<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
     ->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',
    apiPrefix: 'api', // Tambahkan baris ini jika belum ada
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
   ->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'api/*', // Wajib agar request dari Next.js tidak ditolak
    ]);

    $middleware->statefulApi();
})
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
