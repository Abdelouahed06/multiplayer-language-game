<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Avatar;
use Illuminate\Support\Facades\DB;
use Exception;

class PlayerController extends Controller
{

    public function index()
    {
        $players = Player::all();
        if ($players->count() > 0) {
            return response()->json([
                'status' => 200,
                'players' => $players
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found'
            ], 404);
        }
    }



    public function destroy($id)
    {
        $player = Player::find($id);
        if ($player) {
            $player->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Player deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Player found'
            ], 404);
        }
    }

    /** ------------------ AVATAR -------------------- **/
    public function allAvatars() {
        $player = auth('sanctum')->user();
        $myAvatars = Player::with('avatars')->get(); // Assuming you are using Laravel's built-in authentication
        // $otherAvatars = Avatar::whereNotIn('id', $myAvatars)->get();
        return response()->json(['myAvatars' => $myAvatars]);

    }


    // set avater as profile image
    public function useAvatar(Request $request) {
        $validate = Validator::make($request->all(), [
            "avatarId" => 'required|numeric|exists:avatars,id'
        ]);

        if($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        } 

        $player = auth('sanctum')->user();
        $player->avatar_id = $request->avatarId;
        $player->save();

        return response()->json(['player' => $player]);
    }


    // buy avatar
    public function buyAvatar(Request $request) {

        $validate = Validator::make($request->all(), [
            "avatarId" => 'required|numeric|exists:avatars,id',
            "price" => 'required'
        ]);

        if($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        }

        $player = auth('sanctum')->user();

        if($player->coins < $request->price) {
            return response()->json(['error' => "You don't have enough coins!"]);
        }
        try {
            DB::transaction(function () use($player, $request) {

                $player->coins -= $request->price;
                $player->save();
                $player->avatars()->attach($request->avatarId);
            });
            return response()->json(['avatar' => $request->all()]);
        } catch (Exception $e) {
            // Handle the exception
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    /** ------------------ INVITATIONS -------------------- **/


    // search for players by their ID or name
    public function searchPlayers($nameOrId) {
        $players = Player::with('avatar', 'nativeLanguage', 'goalLanguage')->where('id', intval($nameOrId))
            ->orWhere('name', 'like', $nameOrId . '%')
            ->get();
        
        return response()->json(['players' => $players]);
    }

    // return all avatars as well as the avatars of the loged in player
    public function playerAvatars() {
        $avatars = Avatar::all();
        $playerId = auth('sanctum')->user()->id;
        $playerAvatars = Player::with('avatars')->find($playerId)->avatars;
        return response()->json(['avatars' => $avatars, 'playerAvatars' => $playerAvatars]);
    }


    // get the loged in player invitations
    public function playerInvitations(Request $request) {
        $playerId = auth('sanctum')->user()->id;
        $invitations = Player::with('invitations')->find($playerId);
        return response()->json(['invitations' => $invitations->invitations]);

    }

    
    // get the loged in player friends
    public function playerFriends(Request $request) {
        $playerId = auth('sanctum')->user()->id;
        $friends = Player::with('friends')->find($playerId);
        return response()->json(['friends' => $friends->friends]);

    }

    // send invitation
    public function sendInvitation(Request $request) {
        $validate = Validator::make($request->all(), [
            "inviterId" => 'required|numeric|exists:players,id'
        ]);

        if($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        } 

        $player = auth('sanctum')->user();
        $player->invitations()->attach($request->inviterId);

        return response()->json(['player' => $player]);
    }


    // accept invitation
     public function acceptInvitation(Request $request) {
        $validate = Validator::make($request->all(), [
            "inviterId" => 'required|numeric|exists:players,id'
        ]);

        if($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        } 

        $player = auth('sanctum')->user();
        $player->friends()->attach($request->inviterId);

        return response()->json(['player' => $player]);
    }

    // update email, fname, lname
    public function updateInfo(Request $request) {

        $player = auth('sanctum')->user();

        $validate = Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:40', 'unique:players,email,' . $player->id],
            'fname' => ['required', 'max:10', 'min:3'],
            'lname' => ['required', 'max:10', 'min:3'],
        ]);

        if($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        } 

        // $player = auth('sanctum')->user();
        $player->update([
            $player->email = $request->email,
            $player->name = $request->fname .' '. $request->lname
        ]);
        $player->save();

        return response()->json(['player' => $player->load('avatar', 'nativeLanguage', 'goalLanguage')]);
    }


    // update password
    public function updatePassword(Request $request) {
        
        $validate = Validator::make($request->all(), [
            'password' => ['required', 'min:8', 'max:30'],
            'newPassword' => ['required', 'min:8', 'max:30']
        ]);

        if($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 422]);
        } 

        $player = auth('sanctum')->user();

        if (!$player || !Hash::check($request->password,  $player->password)) {
            return response()->json(['error' => 'Password is incorrect.', 'status' => 423]);
        }

        $hashedPassword = Hash::make($request->newPassword);

        $player->update([
            $player->password = $hashedPassword
        ]);

        $player->save();

        return response()->json(['player' => $player->load('avatar', 'nativeLanguage', 'goalLanguage')]);
    }

}
