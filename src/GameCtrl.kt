import kenologic.Keno

open class GameCtrl {

    interface Game {
        fun instructions(): String
        fun start()
        fun showIntro()
    }

    var game: Game = Keno()

    fun onIntro(){
        game.showIntro()
    }

    fun onStart(){
        game.start()
    }

    fun onInstructionsClick(){
        println(game.instructions())
    }

}