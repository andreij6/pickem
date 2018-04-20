package kenologic

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math
import kotlin.math.nextTowards


class Keno : GameCtrl.Game {

    val pickColor = "#AAABA5"
    val drawnColor = "#EFEBE0"
    val hitColor = "#C13F3E"
    val white = "#FFFFFF"
    val black = "#000000"
    val squareColor = "#AFDFDC"
    val boardFont = "30px Arial"
    val menuFont = "15px Arial"

    var gameState = GameState.Pick
    var selectedCount = 0
    var wager = 0.01
    var rounds = 5

    enum class GameState {
        Pick, Drawing, AfterDraw
    }

    enum class ButtonType {
        START, QUICK_PICK, RESTART
    }

    var numberClickRects = mutableListOf<Rect>()
    var menuBtns = mutableListOf<Button>()
    var roundsClickRects = mutableListOf<Rect>()

    override fun showIntro() {
        println("show intro")
    }

    override fun start() {
        val canvas = document.getElementById("game") as HTMLCanvasElement

        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        canvas.addEventListener("click", { event -> onCanvasClicked(event)})

        redraw()
    }

    override fun instructions(): String {
        return "here are the instructions"
    }

    private fun redraw(){
        val canvas = document.getElementById("game") as HTMLCanvasElement

        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        gameState = GameState.Pick
        selectedCount = 0

        ctx.clearRect(0.0, 0.0, canvas.width + 0.0, canvas.height + 0.0);

        updatePayout()

        sideMenu()

        roundsMenu()

        board()
    }

    private fun roundsMenu(){
        val canvas = document.getElementById("game") as HTMLCanvasElement

        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        var x = 300.0
        var interval = 75.0

        roundsClickRects.clear()

        for(count in listOf<Int>(1,5,10,25,50)){

            ctx.fillStyle= squareColor;
            var roundBtn = Rect(x, 750.0, 50.0, 50.0, count)
            ctx.fillRect(roundBtn.x, roundBtn.y, roundBtn.w, roundBtn.h);
            roundsClickRects.add(roundBtn)
            ctx.fillStyle=black;

            ctx.font = menuFont;
            ctx.fillText("$count X", x + 10, 775.0)

            x += interval
        }
    }

    private fun onCanvasClicked(event: Event){
        event as MouseEvent

        println("game State == Pick")
        println(gameState == GameState.Pick)
        println(numberClickRects.size)

        val canvas = document.getElementById("game") as HTMLCanvasElement

        var rect = canvas.getBoundingClientRect()

        var x = (event.clientX - rect.left)
        var y = (event.clientY - rect.top)

        if(gameState == GameState.Pick) {
            numberClickRects.forEach { rect ->
                if (collides(rect, x, y)) {

                    chooseNumber(rect)
                }
            }

            roundsClickRects.forEach { rect ->
                if(collides(rect, x, y)){
                    rounds = rect.number

                    println("$rounds selected")
                }
            }
        }

        menuBtns.forEach { button ->

                if(collides(button, x, y)){
                    when(button.type){
                        ButtonType.START -> {
                            if(gameState == GameState.Pick && selectedCount >= 1) {
                                gameState = GameState.Drawing

                                selectRandom(numberClickRects.filter { r -> r.selected })

                            } else {
                                gameState = GameState.Pick

                                redraw()
                            }

                            if(selectedCount == 0){
                                println("at least pick one")
                            }
                        }
                        ButtonType.QUICK_PICK -> {
                            if(gameState == GameState.Pick){
                                if(selectedCount < 15) {

                                    while (selectedCount < 15) {
                                        var alreadyChosen = chooseNumber(numberClickRects.get(Math.floor(Math.random() * Math.floor(80))), false)

                                        while(alreadyChosen){
                                            selectedCount--
                                            alreadyChosen = chooseNumber(numberClickRects.get(Math.floor(Math.random() * Math.floor(80))), false)
                                        }

                                    }
                                } else {
                                    println("15 numbers already selected")
                                }
                            }
                        }
                        ButtonType.RESTART -> {
                            gameState = GameState.Pick

                            redraw()
                        }
                    }
                }

            }




    }

    private fun selectRandom(preSelected: List<Rect>){
        window.setTimeout({
            reselect(preSelected)

            for (pick in 1..15) {
                val random = Math.floor(Math.random() * Math.floor(79));

                preSelected.map { c -> numberClickRects.first { p -> p.number == c.number }.selected = true }

                chooseNumber(numberClickRects.get(random))
            }

            rounds--

            if(rounds > 0) {
                selectRandom(preSelected)
            } else {
                rounds = 5
            }


        }, 4000)


    }

    private fun reselect(preSelected: List<Rect>) {

        redraw()

        gameState = GameState.Pick

        for(item in preSelected){
            item.selected = false

            chooseNumber(item)
        }

        gameState = GameState.Drawing

    }

    private fun board(){
        val canvas = document.getElementById("game") as HTMLCanvasElement

        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        numberClickRects = mutableListOf<Rect>()

        //Draw Numbers
        var xStart = 300.0
        var yStart = 100.0
        var interval = 80.0

        var x = xStart
        var y = yStart

        ctx.font = boardFont;

        for (num in 1..80) {

            ctx.fillStyle= white;
            var cRect = Rect(x - 15, y - 45,70.0, 70.0, num)
            ctx.fillRect(cRect.x, cRect.y, cRect.w, cRect.h); //click rect
            numberClickRects.add(cRect)

            ctx.fillStyle= squareColor;
            ctx.fillRect(x - 10, y - 40, 60.0, 60.0);
            ctx.fillStyle=black;

            if(num < 10) {
                ctx.fillText(num.toString(), x + 10, y)
            } else {
                ctx.fillText(num.toString(), x + 5, y)
            }

            if(num%10==0){
                if(num != 80) {
                    x = xStart
                }
                y += interval
            } else {
                x += interval
            }
        }

        ctx.lineWidth = 3.0

        //Vertical lines
        var lineX = xStart + interval * 0.75

        for (i in 1..9) {
            ctx.beginPath()
            ctx.moveTo(lineX,yStart * 0.5)
            ctx.lineTo(lineX, y * 0.95)
            ctx.stroke()

            lineX += interval
        }

        var lineY = yStart + interval * 0.35

        //Horizontal lines
        for (i in 1..7) {
            ctx.beginPath()
            ctx.moveTo(xStart - 25,lineY)
            ctx.lineTo(x + (x * 0.07), lineY)
            ctx.stroke()

            lineY += interval
        }

    }

    private fun sideMenu(){
        menuBtns.clear()

        val canvas = document.getElementById("game") as HTMLCanvasElement

        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        //Play - New Game
        ctx.fillStyle= hitColor;
        var play = Button(1150.0, 150.0,70.0 * 1.618, 70.0, ButtonType.START)
        ctx.fillRect(play.x, play.y, play.w, play.h);
        menuBtns.add(play)

        ctx.fillStyle= white;

        ctx.fillText("Play", 1150 + 5.0,200.0 + 3)

        //Quick Pick
        ctx.fillStyle= hitColor;
        var quickPick = Button(1150.0, 250.0,70.0 * 1.618, 70.0, ButtonType.QUICK_PICK)
        ctx.fillRect(quickPick.x, quickPick.y, quickPick.w, quickPick.h);
        menuBtns.add(quickPick)

        ctx.fillStyle= white;

        ctx.fillText("Quick Pick", 1150 + 5.0 ,300.0)

        //Restart Btn
        ctx.fillStyle= hitColor;
        var restartBtn = Button(1150.0, 350.0,70.0 * 1.618, 70.0, ButtonType.RESTART)
        ctx.fillRect(restartBtn.x, restartBtn.y, restartBtn.w, restartBtn.h);
        menuBtns.add(restartBtn)

        ctx.fillStyle= white;
        ctx.fillText("Clear", 1150 + 5.0,400.0)
    }

    private fun chooseNumber(rect: Rect, unselect: Boolean = true): Boolean{
        val canvas = document.getElementById("game") as HTMLCanvasElement

        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        ctx.font = boardFont;

        var alreadyChosen = rect.selected

        when(gameState){
            GameState.Pick ->{
                if(rect.selected && unselect == true){
                    ctx.clearRect(rect.x, rect.y, rect.w, rect.h)

                    ctx.fillStyle= white;
                    ctx.fillRect(rect.x, rect.y, rect.w, rect.h); //click rect

                    ///-----
                    ctx.fillStyle= squareColor;
                    ctx.fillRect(rect.x + 5, rect.y +5, 60.0, 60.0);
                    ctx.fillStyle=black;

                    if(rect.number < 10) {
                        ctx.fillText(rect.number.toString(), rect.x + 25, rect.y + 45)
                    } else {
                        ctx.fillText(rect.number.toString(), rect.x + 20, rect.y + 45)
                    }

                    selectedCount--
                    rect.selected = false

                    updatePayout()

                } else {

                    if(selectedCount < 15){

                        selectedCount++

                        ctx.clearRect(rect.x, rect.y, rect.w, rect.h)

                        var circleX = rect.x + (rect.w * 0.5)
                        var circleY = rect.y + (rect.h * 0.5)

                        ctx.fillStyle = pickColor;
                        ctx.beginPath();
                        ctx.arc(circleX, circleY, 30.0, 0.0, 2 * kotlin.math.PI);
                        ctx.fill()
                        ctx.strokeStyle = pickColor
                        ctx.arc(circleX, circleY, 32.0, 0.0, 2 * kotlin.math.PI);
                        ctx.stroke()
                        ctx.strokeStyle = black
                        ctx.fillStyle = white;
                        if (rect.number < 10) {
                            ctx.fillText(rect.number.toString(), circleX - 10, circleY + 10)
                        } else {
                            ctx.fillText(rect.number.toString(), circleX - 15, circleY + 10)
                        }
                        ctx.fillStyle = black;

                        rect.selected = true

                        updatePayout()
                    }
                }

            }
            GameState.Drawing -> {
                if(rect.selected){
                    var circleX = rect.x + (rect.w * 0.5)
                    var circleY = rect.y + (rect.h * 0.5)

                    ctx.fillStyle = hitColor;
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 30.0, 0.0, 2 * kotlin.math.PI);
                    ctx.fill()
                    ctx.strokeStyle = hitColor
                    ctx.arc(circleX, circleY, 32.0, 0.0, 2 * kotlin.math.PI);
                    ctx.stroke()
                    ctx.strokeStyle = black
                    ctx.fillStyle = white;
                    if (rect.number < 10) {
                        ctx.fillText(rect.number.toString(), circleX - 10, circleY + 10)
                    } else {
                        ctx.fillText(rect.number.toString(), circleX - 15, circleY + 10)
                    }
                    ctx.fillStyle = black;

                } else {

                    var circleX = rect.x + (rect.w * 0.5)
                    var circleY = rect.y + (rect.h * 0.5)

                    ctx.fillStyle = drawnColor;
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 30.0, 0.0, 2 * kotlin.math.PI);
                    ctx.fill()
                    ctx.strokeStyle = drawnColor
                    ctx.arc(circleX, circleY, 32.0, 0.0, 2 * kotlin.math.PI);
                    ctx.stroke()
                    ctx.strokeStyle = black
                    ctx.fillStyle = white;
                    if (rect.number < 10) {
                        ctx.fillText(rect.number.toString(), circleX - 10, circleY + 10)
                    } else {
                        ctx.fillText(rect.number.toString(), circleX - 15, circleY + 10)
                    }
                    ctx.fillStyle = black;
                }
            }
        }

        return alreadyChosen
    }

    private fun updatePayout(){

        var payoutMap = when(selectedCount){
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

        val canvas = document.getElementById("game") as HTMLCanvasElement

        val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

        ctx.font = menuFont;

        var x = 150.0
        var y = 100.0

        ctx.clearRect(x - 125, y - 75, 200.0, (150.0 + (15 * 25)))

        ctx.fillText("HITS", x - 100,y)
        ctx.fillText("PAYOUT",x,y)

        var sortedKeys = payoutMap.keys.sortedDescending()

        for(key in sortedKeys){
            y += 25

            ctx.fillText(key.toString(), x - 85,y)
            ctx.fillText(payoutMap[key]!!.format(2),x + 15,y)
        }

        for(num in sortedKeys.size..10){
            y += 25

            ctx.fillText("-", x - 85,y)
            ctx.fillText("-",x + 15,y)
        }
    }

    private fun collides(box: Rect, x: Double, y: Double): Boolean{
        var left = box.x
        var right = box.x + box.w
        var top = box.y
        var bottom = box.y + box.h

        if(right >= x && left <= x && bottom >= y && top <= y){
            return true
        }

        return false
    }

    private fun collides(box: Button, x: Double, y: Double): Boolean{
        var left = box.x
        var right = box.x + box.w
        var top = box.y
        var bottom = box.y + box.h

        if(right >= x && left <= x && bottom >= y && top <= y){
            return true
        }

        return false
    }

    data class Rect(val x:Double, val y: Double, val w: Double, val h:Double, val number: Int, var selected: Boolean = false)

    data class Button(val x: Double, val y: Double, val w: Double, val h: Double, var type: Keno.ButtonType)

    fun Double.format(digits: Int): String = this.asDynamic().toFixed(digits)

}
