<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Player;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\VocabularyController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ImageController;




/**  Check If Player Is Logged In Or Not  **/
Route::get('/player', function (Request $request) {
    $player = $request->user();

    if ($player) {
        $playerWithAdditionalInfo = Player::with('avatar', 'nativeLanguage', 'goalLanguage')->find($player->id);
        
        // Return the player with language and avatar information
        return $playerWithAdditionalInfo;
    } else {
        // Return a message indicating that the player is not authenticated
        return response()->json(['message' => 'Unauthenticated 111'], 402);
    }
})->middleware('auth:sanctum');

Route::get('/admin', function (Request $request) {
    $player = $request->user();

    if ($player) {        
        // Return the player with language and avatar information
        return $player;
    } else {
        // Return a message indicating that the player is not authenticated
        return response()->json(['message' => 'Unauthenticated 111'], 402);
    }
})->middleware('auth:sanctum');


/**  Auth  **/
Route::post('/player/register', [AuthController::class, 'playerRegister']);
Route::post('/player/login', [AuthController::class, 'playerLogin']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/admin/register', [AuthController::class, 'adminRegister']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


/**  Language  **/
Route::get('/languages', [LanguageController::class, 'indexPlayer']);


/**  Player  **/
Route::middleware('auth:sanctum')->prefix('player')->group(function () {

    Route::get('friends', [PlayerController::class, 'playerFriends']);
    Route::get('invitations', [PlayerController::class, 'playerInvitations']);
    Route::post('send-invitation', [PlayerController::class, 'sendInvitation']);
    Route::post('accept-invitation', [PlayerController::class, 'acceptInvitation']);
    Route::get('avatars', [PlayerController::class, 'playerAvatars']);
    Route::post('use-avatar', [PlayerController::class, 'useAvatar']);
    Route::post('buy-avatar', [PlayerController::class, 'buyAvatar']);
    Route::get('search-players/{nameOrId}', [PlayerController::class, 'searchPlayers']);
    // Setting
    Route::post('update-info', [PlayerController::class, 'updateInfo']);
    Route::post('update-password', [PlayerController::class, 'updatePassword']);


});


/**  Vocabulary  **/
Route::get('/vocabularies', [VocabularyController::class, 'index']);




/** --------------------- Admin Dashboard ----------------------- **/
// admins API
Route::get('/Admins', [AdminController::class, 'index'])->name('Admins');
Route::post('/Admins', [AdminController::class, 'store'])->name('Admins');
Route::delete('/Admins/{id}/delete', [AdminController::class, 'destroy'])->name('Admins');
Route::get('/Admins/{id}/edit', [AdminController::class, 'edit']);
Route::put('/Admins/{id}/editinfo', [AdminController::class, 'updateInfo']);
Route::put('/Admins/{id}/editpass', [AdminController::class, 'updatePassword']);

// players API
Route::get('/Players', [PlayerController::class, 'index'])->name('Players');
Route::delete('/Players/{id}/delete', [PlayerController::class, 'destroy'])->name('Players');

// Languages API
Route::get('/Languages', [LanguageController::class, 'indexAdmin'])->name('Languages');
Route::post('/Languages', [LanguageController::class, 'store'])->name('Languages');
Route::delete('/Languages/{id}/delete', [LanguageController::class, 'destroy'])->name('Languages');
Route::get('/Languages/{id}/edit', [LanguageController::class, 'edit']);
Route::put('/Languages/{id}/edit', [LanguageController::class, 'update']);


// Avatars API
Route::get('/Avatars', [AvatarController::class, 'index'])->name('Avatars');
Route::post('/Avatars', [AvatarController::class, 'store'])->name('Avatars');
Route::delete('/Avatars/{id}/delete', [AvatarController::class, 'destroy'])->name('Avatars');


// Messages API
Route::get('/Messages', [MessageController::class, 'index'])->name('Messages');
Route::post('/Messages', [MessageController::class, 'store'])->name('Messages');
Route::delete('/Messages/{id}/delete', [MessageController::class, 'destroy'])->name('Messages');
Route::get('/Messages/{id}/edit', [MessageController::class, 'edit']);
Route::put('/Messages/{id}/edit', [MessageController::class, 'update']);


// Images API
Route::get('/images', [ImageController::class, 'index']);
Route::post('/images', [ImageController::class, 'store']);
Route::delete('/images/{id}', [ImageController::class, 'destroy']);


// vocabularies API
Route::get('/vocabularies', [VocabularyController::class, 'index']);
Route::post('/vocabularies', [VocabularyController::class, 'store'])->name('Avatars');
Route::get('/vocabularies/{id}', [VocabularyController::class, 'edit']);
Route::put('/vocabularies/{id}', [VocabularyController::class, 'update']);
Route::delete('/vocabularies/{id}', [VocabularyController::class, 'destroy']);



