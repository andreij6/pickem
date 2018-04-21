package keno;

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math
import kotlin.math.round

open class Game {

    interface Presenter {
        fun addView(view: Game.View)
        fun drawNumbers()
        fun clearDrawn()
        fun quickPicks()
        fun clearPicks()
        fun select(number: Int): Boolean
        fun getWager(): Double
        fun getSelectionCount(): Int
        fun clearAll()
        fun setRounds(round: Int)
        fun getCurrentRound(): Int

    }

    interface View {
        fun onStart()
        fun drawnNumbers(numbers: List<Int>, hits: Set<Int>): Boolean
        fun redraw(numbers: List<Int>)
        fun select(playableNumbers: MutableList<Int>)
        fun resize()
        fun selectionUpdated()
        fun setGameState(state: GameState)
        fun drawRounds()
    }

    lateinit var view: Game.View
    lateinit var presenter: Game.Presenter

    fun onStart(){
        presenter = KenoPresenter()

        view = KenoView(presenter)

        presenter.addView(view)

        view.onStart()

        window.addEventListener("resize", { view.resize() })
    }

}

enum class GameState {
    PICKS, DRAWING, POSTDRAW
}

open class KenoPresenter() : Game.Presenter {

    lateinit var view: Game.View

    var playableNumbers = mutableListOf<Int>()
    var drawnNumbers = mutableListOf<Int>()
    var rounds = 1

    override fun addView(view: Game.View) {
        this.view = view
    }

    override fun drawNumbers() {
        if(playableNumbers.isEmpty()) return

        executeRound(rounds - 1)
    }

    fun executeRound(round: Int){
        window.setTimeout({
            view.setGameState(GameState.DRAWING)

            while (drawnNumbers.size < 15) {
                var pick = Math.floor(Math.random() * Math.floor(80) + 1)

                while (drawnNumbers.contains(pick)) {
                    pick = Math.floor(Math.random() * Math.floor(80) + 1)
                }

                drawnNumbers.add(pick)
            }

            var hits = playableNumbers.intersect(drawnNumbers)

            view.drawnNumbers(drawnNumbers, hits)

            if(round > 0){
                window.setTimeout({
                    drawnNumbers.clear()

                    view.redraw(playableNumbers)

                    executeRound(round-1)
                }, 1000)

            } else {
                view.setGameState(GameState.POSTDRAW)
            }

        }, 2500)

    }

    override fun clearDrawn() {
        view.setGameState(GameState.PICKS)

        view.redraw(playableNumbers)

        drawnNumbers.clear()
    }

    override fun quickPicks() {
        view.setGameState(GameState.PICKS)

        if(playableNumbers.size == 15){
            clearAll()
        }

        while(playableNumbers.size < 15){

            var pick = Math.floor(Math.random() * Math.floor(80) + 1)

            while(playableNumbers.contains(pick)) {
                pick = Math.floor(Math.random() * Math.floor(80) + 1)
            }

            playableNumbers.add(pick)
        }

        view.select(playableNumbers)
    }

    override fun clearPicks() {
        view.setGameState(GameState.PICKS)

        playableNumbers.clear()

        view.redraw(emptyList())
    }

    override fun clearAll() {
        view.setGameState(GameState.PICKS)

        playableNumbers.clear()

        drawnNumbers.clear()

        view.redraw(emptyList())
    }

    override fun select(number: Int): Boolean {
        var adding = !playableNumbers.contains(number)

        if(adding){
            if(playableNumbers.size < 15) {
                playableNumbers.add(number)

                view.selectionUpdated()
            } else {
                adding = false
            }
        } else {
            playableNumbers.remove(number)

            view.selectionUpdated()
        }

        return adding
    }

    override fun getWager(): Double {
        return 0.25
    }

    override fun getSelectionCount(): Int {
        return playableNumbers.size
    }

    override fun setRounds(round: Int) {
        rounds = round

        view.drawRounds()
    }

    override fun getCurrentRound(): Int {
        return rounds
    }
}

open class KenoView : Game.View {
    interface ClickListener {
        fun onClick(state: GameState)
    }

    var playBtn: PlayButton? = null
    var quickPick: QuickPickButton? = null
    var clearBtn: ClearButton? = null

    var canvas: HTMLCanvasElement
    var ctx: CanvasRenderingContext2D
    var presenter: Game.Presenter
    var payout: PayoutMenu? = null

    var uiElements : MutableList<Selectable?> = mutableListOf()
    var positions : MutableList<Selectable> = mutableListOf()
    var gameState: GameState = GameState.PICKS

    constructor(presenter: Game.Presenter){
        this.presenter = presenter

        gameState = GameState.PICKS

        canvas = document.getElementById("game") as HTMLCanvasElement

        ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    }

    override fun onStart() {
        playBtn = PlayButton(Rectangle(0.0,0.0,5.0, 5.0), presenter);

        quickPick = QuickPickButton(Rectangle(0.0,0.0,5.0, 5.0), presenter)

        clearBtn = ClearButton(Rectangle(0.0,0.0,5.0, 5.0), presenter)

        payout = PayoutMenu(presenter);

        uiElements = mutableListOf(quickPick, playBtn, clearBtn)

        for (num in 1..80) {
            positions.add(drawPosition(num))
        }

        uiElements.addAll(positions)

        /*drawWagerHeading()

        for(wager in listOf<Double>(0.01, 0.25, 1.00, 5.00, 10.00)){
            uiElements.add(drawWager(wager))
        }

        drawRoundHeading()*/

        for(round in listOf<Int>(1,5,10,25,50)){
            uiElements.add(drawRound(round))
        }

        canvas.addEventListener("click", {event -> onClick(event) })
    }

    private fun drawRound(round: Int): Selectable? {
        var x = 127.0
        var interval = 75.0

        when(round){
            1 -> x = x + interval * 1
            5 -> x = x + interval * 2
            10 -> x = x + interval * 3
            25 -> x = x + interval * 4
            50 -> x = x + interval * 5
        }

        var roundBtn = Rectangle(x, 690.0, 50.0, 50.0)
        ctx.clearRect(roundBtn.x, roundBtn.y, roundBtn.w, roundBtn.h)

        if(presenter.getCurrentRound() == round){
            ctx.fillStyle= "#F25C16";
        } else {
            ctx.fillStyle= "#000000";
        }


        ctx.fillRect(roundBtn.x, roundBtn.y, roundBtn.w, roundBtn.h);
        var rnd = Round(round, roundBtn, presenter)

        ctx.font =  "14px Permanent Marker"

        if(presenter.getCurrentRound() == round){
            ctx.fillStyle="#000000";
        } else {
            ctx.fillStyle="#FFFFFF";
        }

        ctx.fillText("$round X", x + 10, 720.0)

        return  rnd
    }

    override fun drawRounds() {
        for(round in listOf<Int>(1,5,10,25,50)){
            drawRound(round)
        }
    }

    fun onClick(event: Event){
        event as MouseEvent

        var rect = canvas.getBoundingClientRect()

        var x = (event.clientX - rect.left)
        var y = (event.clientY - rect.top)

        for(view in uiElements){
            if((view as Collider).collides(x, y)){
                view.onClick(gameState)
                break
            }
        }
    }

    override fun selectionUpdated() {
        payout!!.onDraw()
    }

    override fun setGameState(state: GameState) {
        this.gameState = state
    }

    private fun drawPosition(num: Int): NumberPosition{
        var np = NumberPosition(num, presenter)

        np.draw(0,0)

        return np
    }

    override fun drawnNumbers(drawn: List<Int>, hits: Set<Int>): Boolean{
        for(number in drawn){
            var target = positions.first{ p -> (p as NumberPosition).number == number}

            if(hits.contains(number)) {
                (target as NumberPosition).hit()
            } else {
                (target as NumberPosition).miss()
            }
        }

        return true
    }

    override fun redraw(numbers: List<Int>) {
        for(position in positions){
            if(!numbers.contains((position as NumberPosition).number)) {
                (position as NumberPosition).deselect()
            }else {
                (position as NumberPosition).select()
            }
        }
        payout!!.onDraw()
    }

    override fun select(playableNumbers: MutableList<Int>) {

        for(number in playableNumbers){
            var target = positions.first{ p -> (p as NumberPosition).number == number}

            (target as NumberPosition).select()
        }

        payout!!.onDraw()
    }

    override fun resize() {

    }
}

data class Rectangle(val x: Double, val y: Double, val w: Double, val h: Double)

abstract class Collider(var box: Rectangle) {

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

    open fun updateBox(r: Rectangle){
        box = r
    }
}

abstract class Selectable(var rect: Rectangle) : Collider(rect), KenoView.ClickListener {

    abstract fun onPicks()
    abstract fun onDrawing()
    abstract fun onRecap()

    override fun onClick(state: GameState) = when(state){
        GameState.PICKS -> onPicks()
        GameState.DRAWING -> onDrawing()
        GameState.POSTDRAW -> onRecap()
    }


    override fun updateBox(r: Rectangle){
        super.updateBox(r)
        rect = r
    }
}

open class PlayButton : Selectable {

    val canvas = document.getElementById("game") as HTMLCanvasElement
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    var presenter: Game.Presenter

    constructor(dimensions: Rectangle, presenter: Game.Presenter): super(dimensions){
        this.presenter = presenter

        draw()
    }

    fun draw(){
        ctx.fillStyle= "#000000"

        var play = Rectangle(975.0, 150.0,70.0 * 1.618, 70.0)

        updateBox(play)

        ctx.fillRect(play.x, play.y, play.w, play.h)

        ctx.fillStyle= "#FFFFFF";

        ctx.font =  "16px Permanent Marker"

        ctx.fillText("PLAY", 975 + 5.0,200.0 + 3)
    }

    override fun onDrawing() {

    }

    override fun onRecap() {
        presenter.clearDrawn()

        presenter.drawNumbers()
    }

    override fun onPicks() {
        presenter.drawNumbers()
    }

}

open class QuickPickButton : Selectable{

    val canvas = document.getElementById("game") as HTMLCanvasElement
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    var presenter: Game.Presenter

    constructor(dimensions: Rectangle, presenter: Game.Presenter): super(dimensions){
        this.presenter = presenter

        draw()
    }

    fun draw(){
        ctx.fillStyle= "#000000"

        var play = Rectangle(975.0, 250.0,70.0 * 1.618, 70.0)

        updateBox(play)

        ctx.fillRect(play.x, play.y, play.w, play.h)

        ctx.fillStyle= "#FFFFFF";
        ctx.font =  "16px Permanent Marker"

        ctx.fillText("Quick Pick", 975 + 5.0,300.0 + 3)
    }

    override fun onPicks() {
        presenter.quickPicks()
    }

    override fun onDrawing() {

    }

    override fun onRecap() {
        presenter.clearAll()

        window.setTimeout({
            presenter.quickPicks()
        }, 250)
    }

}

open class ClearButton : Selectable {

    val canvas = document.getElementById("game") as HTMLCanvasElement
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    var presenter: Game.Presenter

    constructor(dimensions: Rectangle, presenter: Game.Presenter): super(dimensions){
        this.presenter = presenter

        draw()
    }

    fun draw(){
        ctx.fillStyle= "#000000"

        var play = Rectangle(975.0, 350.0,70.0 * 1.618, 70.0)

        updateBox(play)

        ctx.fillRect(play.x, play.y, play.w, play.h)

        ctx.fillStyle= "#FFFFFF";
        ctx.font =  "16px Permanent Marker"

        ctx.fillText("Clear", 975 + 5.0,400.0 + 3)
    }

    override fun onPicks() {
        presenter.clearAll()
    }

    override fun onDrawing() {

    }

    override fun onRecap() {
        presenter.clearAll()
    }

}

open class NumberPosition : Selectable{

    var number: Int
    var presenter: Game.Presenter
    var canvas: HTMLCanvasElement
    var ctx: CanvasRenderingContext2D

    val numberFont = "24px Lobster"

    constructor(number: Int, presenter: Game.Presenter):super(rect = Rectangle(0.0, 0.0, 0.0,0.0)){
        this.number = number
        this.presenter = presenter

        canvas = document.getElementById("game") as HTMLCanvasElement

        ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    }

    override fun onPicks() {
        var selectable = presenter.select(number)

        if(selectable){
            select()
        } else {
            deselect()
        }
    }

    override fun onDrawing() {
    }

    override fun onRecap() {
        presenter.clearDrawn()

        presenter.clearPicks()

        presenter.select(number)

        select()
    }

    fun draw(canvasWidth: Int, canvasHieght: Int) {
        var width = 10
        var height = 8
        var x = 0.0

        var count = 0

        while(x < width){
            count++
            var reset = count

            var y = 0.0

            while(y < height){
                if(count == number){
                    drawReadySquare(x, y)

                    return
                } else {
                    count += 10
                }
                y++
            }

            count = reset
            x++
        }


    }

    fun select(){
        drawCircle("#7187C5", "#FFFFFF")
    }

    fun deselect(){
        draw(0, 0)
    }

    fun hit(){
        drawCircle("#E4485D", "#F7EFF1")
    }

    fun miss(){
        drawCircle("#D9DFE8", "#47475C")
    }

    private fun drawCircle(circleColor: String, txtColor: String){
        ctx.clearRect(rect.x, rect.y, rect.w, rect.h)

        var circleX = rect.x + (rect.w * 0.5)
        var circleY = rect.y + (rect.h * 0.5)

        ctx.fillStyle = circleColor

        ctx.beginPath();
        ctx.arc(circleX, circleY, 30.0, 0.0, 2 * kotlin.math.PI);
        ctx.fill()

        ctx.strokeStyle = circleColor
        ctx.arc(circleX, circleY, 32.0, 0.0, 2 * kotlin.math.PI);
        ctx.stroke()

        ctx.strokeStyle = txtColor
        ctx.fillStyle = txtColor;

        ctx.font = numberFont

        if (number < 10) {
            ctx.fillText(number.toString(), circleX - 10, circleY + 10)
        } else {
            ctx.fillText(number.toString(), circleX - 15, circleY + 10)
        }
    }

    fun drawReadySquare(x:Double, y:Double){
        var over = 200
        var down = 50
        var length = 75.0

        var r = Rectangle((x * length) + over, (y * length) + down, length, length)

        updateBox(r)

        var inset = 5

        ctx.fillStyle= "#47475C"
        //visible inner
        ctx.fillRect(box.x + inset, box.y + inset, box.w - inset, box.h - inset)

        ctx.font =  numberFont

        ctx.fillStyle="#F7EFF1"
        if(number < 10) {
            ctx.fillText(number.toString(), box.x + (length * 0.45), box.y + (length * 0.625))
        } else {
            ctx.fillText(number.toString(), box.x + (length * 0.35), box.y + (length * 0.625))
        }
    }
}

open class PayoutMenu {

    var canvas: HTMLCanvasElement
    var ctx: CanvasRenderingContext2D
    var presenter: Game.Presenter

    constructor(presenter: Game.Presenter){
        canvas = document.getElementById("game") as HTMLCanvasElement

        ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        this.presenter = presenter

        onDraw()
    }

    fun onDraw(){
        var x = 50.0
        var y = 100.0

        var over = 55
        var down = 50
        var length = 75.0

        ctx.clearRect(x - 11, y - 20, x + 100, (150.0 + (15 * 25)))

        var payouts = generatePayoutMap()

        ctx.font =  "20px Permanent Marker"
        ctx.fillStyle="#000000"

        ctx.fillText("HIT", x - 10,y)
        ctx.fillText("PAYOUT",x + over,y)

        var sortedKeys = payouts.keys.sortedDescending()

        ctx.font =  "16px Open Sans"


        for(key in sortedKeys){
            y += 25

            ctx.fillText(key.toString(), x,y)
            ctx.fillText(payouts[key]!!.format(2),x + over,y)
        }

        for(num in sortedKeys.size..10){
            y += 25

            ctx.fillText("-", x,y)
            ctx.fillText("-",x + over + 15,y)
        }
    }

    fun generatePayoutMap():Map<Int, Double> {
        var wager = presenter.getWager()

        return when (presenter.getSelectionCount()) {
            1 -> mapOf(1 to (wager * 3))
            2 -> mapOf(2 to (wager * 15))
            3 -> mapOf(3 to (wager * 45), 2 to (wager * 2))
            4 -> mapOf(4 to (wager * 155), 3 to (wager * 5), 2 to (wager * 1))
            5 -> mapOf(5 to (wager * 850), 4 to (wager * 15), 3 to (wager * 2))
            6 -> mapOf(6 to (wager * 2000), 5 to (wager * 111), 4 to (wager * 6), 3 to (wager * 1))
            7 -> mapOf(7 to (wager * 8000), 6 to (wager * 450), 5 to (wager * 32), 4 to (wager * 2))
            8 -> mapOf(8 to (wager * 30000), 7 to (wager * 1700), 6 to (wager * 135), 5 to (wager * 10))
            9 -> mapOf(9 to (wager * 50000), 8 to (wager * 4000), 7 to (wager * 310), 6 to (wager * 62), 5 to (wager * 6))
            10 -> mapOf(10 to (wager * 100000), 9 to (wager * 10000), 8 to (wager * 12000), 7 to (wager * 180), 6 to (wager * 26), 5 to (wager * 2))
            11 -> mapOf(11 to (wager * 100000), 10 to (wager * 25000), 9 to (wager * 2500), 8 to (wager * 500), 7 to (wager * 100), 6 to (wager * 13))
            12 -> mapOf(12 to (wager * 100000), 11 to (wager * 25000), 10 to (wager * 5000), 9 to (wager * 1200), 8 to (wager * 270), 7 to (wager * 45), 6 to (wager * 6))
            13 -> mapOf(13 to (wager * 100000), 12 to (wager * 50000), 11 to (wager * 15000), 10 to (wager * 4500), 9 to (wager * 800), 8 to (wager * 90), 7 to (wager * 23), 6 to (wager * 2), 0 to (wager * 2))
            14 -> mapOf(14 to (wager * 100000), 13 to (wager * 50000), 12 to (wager * 25000), 11 to (wager * 10000), 10 to (wager * 1500), 9 to (wager * 375), 8 to (wager * 50), 7 to (wager * 10), 6 to (wager * 2), 0 to (wager * 2))
            15 -> mapOf(15 to (wager * 100000), 14 to (wager * 100000), 13 to (wager * 50000), 12 to (wager * 25000), 11 to (wager * 2800), 10 to (wager * 600), 9 to (wager * 140), 8 to (wager * 30), 7 to (wager * 12), 6 to (wager * 2), 0 to (wager * 2))
            else -> emptyMap()
        }
    }
}

open class Round : Selectable {

    var presenter: Game.Presenter
    var round: Int

    constructor(round: Int, dimensions: Rectangle, presenter: Game.Presenter): super(dimensions){
        this.presenter = presenter
        this.round = round
    }

    override fun onPicks() {
        presenter.setRounds(round)
    }

    override fun onDrawing() {

    }

    override fun onRecap() {
        presenter.setRounds(round)
    }
}

fun Double.format(digits: Int): String = this.asDynamic().toFixed(digits)



