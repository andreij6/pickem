package keno;

open class Game {

    interface Presenter {

    }

    interface View {
        fun onStart()

    }

    var view = KenoView()
    var presenter = KenoPresenter(view)

    fun onStart(){
        view.onStart()
    }

}


open class KenoPresenter(val view: KenoView) : Game.Presenter {


}

open class KenoView : Game.View {

    lateinit var playBtn: PlayButton;
    lateinit var quickPick: QuickPickButton;

    override fun onStart() {
        playBtn = PlayButton(Rectangle(0.0,0.0,5.0, 5.0));

        quickPick = QuickPickButton(Rectangle(0.0,0.0,5.0, 5.0))
    }


}


data class Rectangle(val x: Double, val y: Double, val w: Double, val h: Double)

abstract class Collider(val box: Rectangle) {

    abstract fun onClick(state: GameState)

    fun collides(x: Double, y: Double): Boolean{
        var left = box.x
        var right = box.x + box.w
        var top = box.y
        var bottom = box.y + box.h

        if(right >= x && left <= x && bottom >= y && top <= y){
            return true
        }

        return false
    }
}

abstract class MenuButton(val rect: Rectangle) : Collider(rect) {
    abstract fun onPicks()
    abstract fun onDrawing()
    abstract fun onRecap()


}

open class PlayButton(val dimensions: Rectangle) : MenuButton(dimensions) {

    override fun onClick(state: GameState) {
        when(state){
            GameState.PICKS -> onPicks()
            GameState.DRAWING -> onDrawing()
            GameState.POSTDRAW -> onRecap()
        }
    }

    override fun onDrawing() {

    }

    override fun onRecap() {

    }

    override fun onPicks() {

    }

}

open class QuickPickButton(val dimensions: Rectangle) : MenuButton(dimensions){
    override fun onPicks() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun onDrawing() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun onRecap() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun onClick(state: GameState) {

    }

}

enum class GameState {
    PICKS, DRAWING, POSTDRAW
}

open class BoardPosition(val dimensions: Rectangle) {

    fun onClick() {

    }

}

