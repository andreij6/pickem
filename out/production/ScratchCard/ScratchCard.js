if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'ScratchCard'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'ScratchCard'.");
}
var ScratchCard = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var math = Kotlin.kotlin.math;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var mapOf = Kotlin.kotlin.collections.mapOf_x2b85n$;
  var mapOf_0 = Kotlin.kotlin.collections.mapOf_qfcya0$;
  var emptyMap = Kotlin.kotlin.collections.emptyMap_q3lmfv$;
  var sortedDescending = Kotlin.kotlin.collections.sortedDescending_exjks8$;
  var ensureNotNull = Kotlin.ensureNotNull;
  Keno$GameState.prototype = Object.create(Enum.prototype);
  Keno$GameState.prototype.constructor = Keno$GameState;
  Keno$ButtonType.prototype = Object.create(Enum.prototype);
  Keno$ButtonType.prototype.constructor = Keno$ButtonType;
  function GameCtrl() {
    this.game = new Keno();
  }
  function GameCtrl$Game() {
  }
  GameCtrl$Game.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Game',
    interfaces: []
  };
  GameCtrl.prototype.onIntro = function () {
    this.game.showIntro();
  };
  GameCtrl.prototype.onStart = function () {
    this.game.start();
  };
  GameCtrl.prototype.onInstructionsClick = function () {
    println(this.game.instructions());
  };
  GameCtrl.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameCtrl',
    interfaces: []
  };
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function Keno() {
    this.pickColor = '#AAABA5';
    this.drawnColor = '#EFEBE0';
    this.hitColor = '#C13F3E';
    this.white = '#FFFFFF';
    this.black = '#000000';
    this.squareColor = '#AFDFDC';
    this.boardFont = '30px Arial';
    this.menuFont = '15px Arial';
    this.gameState = Keno$GameState$Pick_getInstance();
    this.selectedCount = 0;
    this.wager = 0.01;
    this.rounds = 5;
    this.numberClickRects = ArrayList_init();
    this.menuBtns = ArrayList_init();
    this.roundsClickRects = ArrayList_init();
  }
  function Keno$GameState(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Keno$GameState_initFields() {
    Keno$GameState_initFields = function () {
    };
    Keno$GameState$Pick_instance = new Keno$GameState('Pick', 0);
    Keno$GameState$Drawing_instance = new Keno$GameState('Drawing', 1);
    Keno$GameState$AfterDraw_instance = new Keno$GameState('AfterDraw', 2);
  }
  var Keno$GameState$Pick_instance;
  function Keno$GameState$Pick_getInstance() {
    Keno$GameState_initFields();
    return Keno$GameState$Pick_instance;
  }
  var Keno$GameState$Drawing_instance;
  function Keno$GameState$Drawing_getInstance() {
    Keno$GameState_initFields();
    return Keno$GameState$Drawing_instance;
  }
  var Keno$GameState$AfterDraw_instance;
  function Keno$GameState$AfterDraw_getInstance() {
    Keno$GameState_initFields();
    return Keno$GameState$AfterDraw_instance;
  }
  Keno$GameState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameState',
    interfaces: [Enum]
  };
  function Keno$GameState$values() {
    return [Keno$GameState$Pick_getInstance(), Keno$GameState$Drawing_getInstance(), Keno$GameState$AfterDraw_getInstance()];
  }
  Keno$GameState.values = Keno$GameState$values;
  function Keno$GameState$valueOf(name) {
    switch (name) {
      case 'Pick':
        return Keno$GameState$Pick_getInstance();
      case 'Drawing':
        return Keno$GameState$Drawing_getInstance();
      case 'AfterDraw':
        return Keno$GameState$AfterDraw_getInstance();
      default:throwISE('No enum constant kenologic.Keno.GameState.' + name);
    }
  }
  Keno$GameState.valueOf_61zpoe$ = Keno$GameState$valueOf;
  function Keno$ButtonType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Keno$ButtonType_initFields() {
    Keno$ButtonType_initFields = function () {
    };
    Keno$ButtonType$START_instance = new Keno$ButtonType('START', 0);
    Keno$ButtonType$QUICK_PICK_instance = new Keno$ButtonType('QUICK_PICK', 1);
    Keno$ButtonType$RESTART_instance = new Keno$ButtonType('RESTART', 2);
  }
  var Keno$ButtonType$START_instance;
  function Keno$ButtonType$START_getInstance() {
    Keno$ButtonType_initFields();
    return Keno$ButtonType$START_instance;
  }
  var Keno$ButtonType$QUICK_PICK_instance;
  function Keno$ButtonType$QUICK_PICK_getInstance() {
    Keno$ButtonType_initFields();
    return Keno$ButtonType$QUICK_PICK_instance;
  }
  var Keno$ButtonType$RESTART_instance;
  function Keno$ButtonType$RESTART_getInstance() {
    Keno$ButtonType_initFields();
    return Keno$ButtonType$RESTART_instance;
  }
  Keno$ButtonType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ButtonType',
    interfaces: [Enum]
  };
  function Keno$ButtonType$values() {
    return [Keno$ButtonType$START_getInstance(), Keno$ButtonType$QUICK_PICK_getInstance(), Keno$ButtonType$RESTART_getInstance()];
  }
  Keno$ButtonType.values = Keno$ButtonType$values;
  function Keno$ButtonType$valueOf(name) {
    switch (name) {
      case 'START':
        return Keno$ButtonType$START_getInstance();
      case 'QUICK_PICK':
        return Keno$ButtonType$QUICK_PICK_getInstance();
      case 'RESTART':
        return Keno$ButtonType$RESTART_getInstance();
      default:throwISE('No enum constant kenologic.Keno.ButtonType.' + name);
    }
  }
  Keno$ButtonType.valueOf_61zpoe$ = Keno$ButtonType$valueOf;
  Keno.prototype.showIntro = function () {
    println('show intro');
  };
  function Keno$start$lambda(this$Keno) {
    return function (event) {
      this$Keno.onCanvasClicked_0(event);
      return Unit;
    };
  }
  Keno.prototype.start = function () {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    canvas.addEventListener('click', Keno$start$lambda(this));
    this.redraw_0();
  };
  Keno.prototype.instructions = function () {
    return 'here are the instructions';
  };
  Keno.prototype.redraw_0 = function () {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    this.gameState = Keno$GameState$Pick_getInstance();
    this.selectedCount = 0;
    ctx.clearRect(0.0, 0.0, canvas.width + 0.0, canvas.height + 0.0);
    this.updatePayout_0();
    this.sideMenu_0();
    this.roundsMenu_0();
    this.board_0();
  };
  Keno.prototype.roundsMenu_0 = function () {
    var tmp$, tmp$_0, tmp$_1;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    var x = 300.0;
    var interval = 75.0;
    this.roundsClickRects.clear();
    tmp$_1 = listOf([1, 5, 10, 25, 50]).iterator();
    while (tmp$_1.hasNext()) {
      var count = tmp$_1.next();
      ctx.fillStyle = this.squareColor;
      var roundBtn = new Keno$Rect(x, 750.0, 50.0, 50.0, count);
      ctx.fillRect(roundBtn.x, roundBtn.y, roundBtn.w, roundBtn.h);
      this.roundsClickRects.add_11rb$(roundBtn);
      ctx.fillStyle = this.black;
      ctx.font = this.menuFont;
      ctx.fillText(count.toString() + ' X', x + 10, 775.0);
      x += interval;
    }
  };
  Keno.prototype.onCanvasClicked_0 = function (event) {
    var tmp$, tmp$_0;
    Kotlin.isType(tmp$ = event, MouseEvent) ? tmp$ : throwCCE();
    println('game State == Pick');
    println(this.gameState === Keno$GameState$Pick_getInstance());
    println(this.numberClickRects.size);
    var canvas = Kotlin.isType(tmp$_0 = document.getElementById('game'), HTMLCanvasElement) ? tmp$_0 : throwCCE();
    var rect = canvas.getBoundingClientRect();
    var x = {v: event.clientX - rect.left};
    var y = {v: event.clientY - rect.top};
    if (this.gameState === Keno$GameState$Pick_getInstance()) {
      var tmp$_1;
      tmp$_1 = this.numberClickRects.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        if (this.collides_0(element, x.v, y.v)) {
          this.chooseNumber_0(element);
        }
      }
      var tmp$_2;
      tmp$_2 = this.roundsClickRects.iterator();
      while (tmp$_2.hasNext()) {
        var element_0 = tmp$_2.next();
        if (this.collides_0(element_0, x.v, y.v)) {
          this.rounds = element_0.number;
          println(this.rounds.toString() + ' selected');
        }
      }
    }
    var tmp$_3;
    tmp$_3 = this.menuBtns.iterator();
    while (tmp$_3.hasNext()) {
      var element_1 = tmp$_3.next();
      if (this.collides_1(element_1, x.v, y.v)) {
        switch (element_1.type.name) {
          case 'START':
            if (this.gameState === Keno$GameState$Pick_getInstance() && this.selectedCount >= 1) {
              this.gameState = Keno$GameState$Drawing_getInstance();
              var $receiver = this.numberClickRects;
              var destination = ArrayList_init();
              var tmp$_4;
              tmp$_4 = $receiver.iterator();
              while (tmp$_4.hasNext()) {
                var element_2 = tmp$_4.next();
                if (element_2.selected)
                  destination.add_11rb$(element_2);
              }
              this.selectRandom_0(destination);
            }
             else {
              this.gameState = Keno$GameState$Pick_getInstance();
              this.redraw_0();
            }

            if (this.selectedCount === 0) {
              println('at least pick one');
            }

            break;
          case 'QUICK_PICK':
            if (this.gameState === Keno$GameState$Pick_getInstance()) {
              if (this.selectedCount < 15) {
                while (this.selectedCount < 15) {
                  var alreadyChosen = this.chooseNumber_0(this.numberClickRects.get_za3lpa$(Math.floor(Math.random() * Math.floor(80))), false);
                  while (alreadyChosen) {
                    this.selectedCount = this.selectedCount - 1 | 0;
                    alreadyChosen = this.chooseNumber_0(this.numberClickRects.get_za3lpa$(Math.floor(Math.random() * Math.floor(80))), false);
                  }
                }
              }
               else {
                println('15 numbers already selected');
              }
            }

            break;
          case 'RESTART':
            this.gameState = Keno$GameState$Pick_getInstance();
            this.redraw_0();
            break;
        }
      }
    }
  };
  var NoSuchElementException_init = Kotlin.kotlin.NoSuchElementException;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  function Keno$selectRandom$lambda(closure$preSelected, this$Keno) {
    return function () {
      var tmp$;
      this$Keno.reselect_0(closure$preSelected);
      for (var pick = 1; pick <= 15; pick++) {
        var random = Math.floor(Math.random() * Math.floor(79));
        var $receiver = closure$preSelected;
        var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
        var tmp$_0;
        tmp$_0 = $receiver.iterator();
        while (tmp$_0.hasNext()) {
          var item = tmp$_0.next();
          var tmp$_1 = destination.add_11rb$;
          var $receiver_0 = this$Keno.numberClickRects;
          var first$result;
          first$break: do {
            var tmp$_2;
            tmp$_2 = $receiver_0.iterator();
            while (tmp$_2.hasNext()) {
              var element = tmp$_2.next();
              if (element.number === item.number) {
                first$result = element;
                break first$break;
              }
            }
            throw new NoSuchElementException_init('Collection contains no element matching the predicate.');
          }
           while (false);
          first$result.selected = true;
          tmp$_1.call(destination, Unit);
        }
        this$Keno.chooseNumber_0(this$Keno.numberClickRects.get_za3lpa$(random));
      }
      tmp$ = this$Keno.rounds;
      this$Keno.rounds = tmp$ - 1 | 0;
      if (this$Keno.rounds > 0) {
        this$Keno.selectRandom_0(closure$preSelected);
      }
       else {
        this$Keno.rounds = 5;
      }
      return Unit;
    };
  }
  Keno.prototype.selectRandom_0 = function (preSelected) {
    window.setTimeout(Keno$selectRandom$lambda(preSelected, this), 4000);
  };
  Keno.prototype.reselect_0 = function (preSelected) {
    var tmp$;
    this.redraw_0();
    this.gameState = Keno$GameState$Pick_getInstance();
    tmp$ = preSelected.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      item.selected = false;
      this.chooseNumber_0(item);
    }
    this.gameState = Keno$GameState$Drawing_getInstance();
  };
  Keno.prototype.board_0 = function () {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    this.numberClickRects = ArrayList_init();
    var xStart = 300.0;
    var yStart = 100.0;
    var interval = 80.0;
    var x = xStart;
    var y = yStart;
    ctx.font = this.boardFont;
    for (var num = 1; num <= 80; num++) {
      ctx.fillStyle = this.white;
      var cRect = new Keno$Rect(x - 15, y - 45, 70.0, 70.0, num);
      ctx.fillRect(cRect.x, cRect.y, cRect.w, cRect.h);
      this.numberClickRects.add_11rb$(cRect);
      ctx.fillStyle = this.squareColor;
      ctx.fillRect(x - 10, y - 40, 60.0, 60.0);
      ctx.fillStyle = this.black;
      if (num < 10) {
        ctx.fillText(num.toString(), x + 10, y);
      }
       else {
        ctx.fillText(num.toString(), x + 5, y);
      }
      if (num % 10 === 0) {
        if (num !== 80) {
          x = xStart;
        }
        y += interval;
      }
       else {
        x += interval;
      }
    }
    ctx.lineWidth = 3.0;
    var lineX = xStart + interval * 0.75;
    for (var i = 1; i <= 9; i++) {
      ctx.beginPath();
      ctx.moveTo(lineX, yStart * 0.5);
      ctx.lineTo(lineX, y * 0.95);
      ctx.stroke();
      lineX += interval;
    }
    var lineY = yStart + interval * 0.35;
    for (var i_0 = 1; i_0 <= 7; i_0++) {
      ctx.beginPath();
      ctx.moveTo(xStart - 25, lineY);
      ctx.lineTo(x + x * 0.07, lineY);
      ctx.stroke();
      lineY += interval;
    }
  };
  Keno.prototype.sideMenu_0 = function () {
    var tmp$, tmp$_0;
    this.menuBtns.clear();
    var canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    ctx.fillStyle = this.hitColor;
    var play = new Keno$Button(1150.0, 150.0, 70.0 * 1.618, 70.0, Keno$ButtonType$START_getInstance());
    ctx.fillRect(play.x, play.y, play.w, play.h);
    this.menuBtns.add_11rb$(play);
    ctx.fillStyle = this.white;
    ctx.fillText('Play', 1150 + 5.0, 200.0 + 3);
    ctx.fillStyle = this.hitColor;
    var quickPick = new Keno$Button(1150.0, 250.0, 70.0 * 1.618, 70.0, Keno$ButtonType$QUICK_PICK_getInstance());
    ctx.fillRect(quickPick.x, quickPick.y, quickPick.w, quickPick.h);
    this.menuBtns.add_11rb$(quickPick);
    ctx.fillStyle = this.white;
    ctx.fillText('Quick Pick', 1150 + 5.0, 300.0);
    ctx.fillStyle = this.hitColor;
    var restartBtn = new Keno$Button(1150.0, 350.0, 70.0 * 1.618, 70.0, Keno$ButtonType$RESTART_getInstance());
    ctx.fillRect(restartBtn.x, restartBtn.y, restartBtn.w, restartBtn.h);
    this.menuBtns.add_11rb$(restartBtn);
    ctx.fillStyle = this.white;
    ctx.fillText('Clear', 1150 + 5.0, 400.0);
  };
  Keno.prototype.chooseNumber_0 = function (rect, unselect) {
    if (unselect === void 0)
      unselect = true;
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    ctx.font = this.boardFont;
    var alreadyChosen = rect.selected;
    switch (this.gameState.name) {
      case 'Pick':
        if (rect.selected && unselect === true) {
          ctx.clearRect(rect.x, rect.y, rect.w, rect.h);
          ctx.fillStyle = this.white;
          ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
          ctx.fillStyle = this.squareColor;
          ctx.fillRect(rect.x + 5, rect.y + 5, 60.0, 60.0);
          ctx.fillStyle = this.black;
          if (rect.number < 10) {
            ctx.fillText(rect.number.toString(), rect.x + 25, rect.y + 45);
          }
           else {
            ctx.fillText(rect.number.toString(), rect.x + 20, rect.y + 45);
          }
          this.selectedCount = this.selectedCount - 1 | 0;
          rect.selected = false;
          this.updatePayout_0();
        }
         else {
          if (this.selectedCount < 15) {
            this.selectedCount = this.selectedCount + 1 | 0;
            ctx.clearRect(rect.x, rect.y, rect.w, rect.h);
            var circleX = rect.x + rect.w * 0.5;
            var circleY = rect.y + rect.h * 0.5;
            ctx.fillStyle = this.pickColor;
            ctx.beginPath();
            ctx.arc(circleX, circleY, 30.0, 0.0, 2 * math.PI);
            ctx.fill();
            ctx.strokeStyle = this.pickColor;
            ctx.arc(circleX, circleY, 32.0, 0.0, 2 * math.PI);
            ctx.stroke();
            ctx.strokeStyle = this.black;
            ctx.fillStyle = this.white;
            if (rect.number < 10) {
              ctx.fillText(rect.number.toString(), circleX - 10, circleY + 10);
            }
             else {
              ctx.fillText(rect.number.toString(), circleX - 15, circleY + 10);
            }
            ctx.fillStyle = this.black;
            rect.selected = true;
            this.updatePayout_0();
          }
        }

        break;
      case 'Drawing':
        if (rect.selected) {
          var circleX_0 = rect.x + rect.w * 0.5;
          var circleY_0 = rect.y + rect.h * 0.5;
          ctx.fillStyle = this.hitColor;
          ctx.beginPath();
          ctx.arc(circleX_0, circleY_0, 30.0, 0.0, 2 * math.PI);
          ctx.fill();
          ctx.strokeStyle = this.hitColor;
          ctx.arc(circleX_0, circleY_0, 32.0, 0.0, 2 * math.PI);
          ctx.stroke();
          ctx.strokeStyle = this.black;
          ctx.fillStyle = this.white;
          if (rect.number < 10) {
            ctx.fillText(rect.number.toString(), circleX_0 - 10, circleY_0 + 10);
          }
           else {
            ctx.fillText(rect.number.toString(), circleX_0 - 15, circleY_0 + 10);
          }
          ctx.fillStyle = this.black;
        }
         else {
          var circleX_1 = rect.x + rect.w * 0.5;
          var circleY_1 = rect.y + rect.h * 0.5;
          ctx.fillStyle = this.drawnColor;
          ctx.beginPath();
          ctx.arc(circleX_1, circleY_1, 30.0, 0.0, 2 * math.PI);
          ctx.fill();
          ctx.strokeStyle = this.drawnColor;
          ctx.arc(circleX_1, circleY_1, 32.0, 0.0, 2 * math.PI);
          ctx.stroke();
          ctx.strokeStyle = this.black;
          ctx.fillStyle = this.white;
          if (rect.number < 10) {
            ctx.fillText(rect.number.toString(), circleX_1 - 10, circleY_1 + 10);
          }
           else {
            ctx.fillText(rect.number.toString(), circleX_1 - 15, circleY_1 + 10);
          }
          ctx.fillStyle = this.black;
        }

        break;
    }
    return alreadyChosen;
  };
  Keno.prototype.updatePayout_0 = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    switch (this.selectedCount) {
      case 1:
        tmp$ = mapOf(to(1, this.wager * 3));
        break;
      case 2:
        tmp$ = mapOf(to(2, this.wager * 15));
        break;
      case 3:
        tmp$ = mapOf_0([to(3, this.wager * 45), to(2, this.wager * 2)]);
        break;
      case 4:
        tmp$ = mapOf_0([to(4, this.wager * 155), to(3, this.wager * 5), to(2, this.wager * 1)]);
        break;
      case 5:
        tmp$ = mapOf_0([to(5, this.wager * 850), to(4, this.wager * 15), to(3, this.wager * 2)]);
        break;
      case 6:
        tmp$ = mapOf_0([to(6, this.wager * 2000), to(5, this.wager * 111), to(4, this.wager * 6), to(3, this.wager * 1)]);
        break;
      case 7:
        tmp$ = mapOf_0([to(7, this.wager * 8000), to(6, this.wager * 450), to(5, this.wager * 32), to(4, this.wager * 2)]);
        break;
      case 8:
        tmp$ = mapOf_0([to(8, this.wager * 30000), to(7, this.wager * 1700), to(6, this.wager * 135), to(5, this.wager * 10)]);
        break;
      case 9:
        tmp$ = mapOf_0([to(9, this.wager * 50000), to(8, this.wager * 4000), to(7, this.wager * 310), to(6, this.wager * 62), to(5, this.wager * 6)]);
        break;
      case 10:
        tmp$ = mapOf_0([to(10, this.wager * 100000), to(9, this.wager * 10000), to(8, this.wager * 12000), to(7, this.wager * 180), to(6, this.wager * 26), to(5, this.wager * 2)]);
        break;
      case 11:
        tmp$ = mapOf_0([to(11, this.wager * 100000), to(10, this.wager * 25000), to(9, this.wager * 2500), to(8, this.wager * 500), to(7, this.wager * 100), to(6, this.wager * 13)]);
        break;
      case 12:
        tmp$ = mapOf_0([to(12, this.wager * 100000), to(11, this.wager * 25000), to(10, this.wager * 5000), to(9, this.wager * 1200), to(8, this.wager * 270), to(7, this.wager * 45), to(6, this.wager * 6)]);
        break;
      case 13:
        tmp$ = mapOf_0([to(13, this.wager * 100000), to(12, this.wager * 50000), to(11, this.wager * 15000), to(10, this.wager * 4500), to(9, this.wager * 800), to(8, this.wager * 90), to(7, this.wager * 23), to(6, this.wager * 2), to(0, this.wager * 2)]);
        break;
      case 14:
        tmp$ = mapOf_0([to(14, this.wager * 100000), to(13, this.wager * 50000), to(12, this.wager * 25000), to(11, this.wager * 10000), to(10, this.wager * 1500), to(9, this.wager * 375), to(8, this.wager * 50), to(7, this.wager * 10), to(6, this.wager * 2), to(0, this.wager * 2)]);
        break;
      case 15:
        tmp$ = mapOf_0([to(15, this.wager * 100000), to(14, this.wager * 100000), to(13, this.wager * 50000), to(12, this.wager * 25000), to(11, this.wager * 2800), to(10, this.wager * 600), to(9, this.wager * 140), to(8, this.wager * 30), to(7, this.wager * 12), to(6, this.wager * 2), to(0, this.wager * 2)]);
        break;
      default:tmp$ = emptyMap();
        break;
    }
    var payoutMap = tmp$;
    var canvas = Kotlin.isType(tmp$_0 = document.getElementById('game'), HTMLCanvasElement) ? tmp$_0 : throwCCE();
    var ctx = Kotlin.isType(tmp$_1 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_1 : throwCCE();
    ctx.font = this.menuFont;
    var x = 150.0;
    var y = 100.0;
    ctx.clearRect(x - 125, y - 75, 200.0, 150.0 + (15 * 25 | 0));
    ctx.fillText('HITS', x - 100, y);
    ctx.fillText('PAYOUT', x, y);
    var sortedKeys = sortedDescending(payoutMap.keys);
    tmp$_2 = sortedKeys.iterator();
    while (tmp$_2.hasNext()) {
      var key = tmp$_2.next();
      y += 25;
      ctx.fillText(key.toString(), x - 85, y);
      ctx.fillText(this.format_j6vyb1$(ensureNotNull(payoutMap.get_11rb$(key)), 2), x + 15, y);
    }
    for (var num = sortedKeys.size; num <= 10; num++) {
      y += 25;
      ctx.fillText('-', x - 85, y);
      ctx.fillText('-', x + 15, y);
    }
  };
  Keno.prototype.collides_0 = function (box, x, y) {
    var left = box.x;
    var right = box.x + box.w;
    var top = box.y;
    var bottom = box.y + box.h;
    if (right >= x && left <= x && bottom >= y && top <= y) {
      return true;
    }
    return false;
  };
  Keno.prototype.collides_1 = function (box, x, y) {
    var left = box.x;
    var right = box.x + box.w;
    var top = box.y;
    var bottom = box.y + box.h;
    if (right >= x && left <= x && bottom >= y && top <= y) {
      return true;
    }
    return false;
  };
  function Keno$Rect(x, y, w, h, number, selected) {
    if (selected === void 0)
      selected = false;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.number = number;
    this.selected = selected;
  }
  Keno$Rect.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Rect',
    interfaces: []
  };
  Keno$Rect.prototype.component1 = function () {
    return this.x;
  };
  Keno$Rect.prototype.component2 = function () {
    return this.y;
  };
  Keno$Rect.prototype.component3 = function () {
    return this.w;
  };
  Keno$Rect.prototype.component4 = function () {
    return this.h;
  };
  Keno$Rect.prototype.component5 = function () {
    return this.number;
  };
  Keno$Rect.prototype.component6 = function () {
    return this.selected;
  };
  Keno$Rect.prototype.copy_oaos19$ = function (x, y, w, h, number, selected) {
    return new Keno$Rect(x === void 0 ? this.x : x, y === void 0 ? this.y : y, w === void 0 ? this.w : w, h === void 0 ? this.h : h, number === void 0 ? this.number : number, selected === void 0 ? this.selected : selected);
  };
  Keno$Rect.prototype.toString = function () {
    return 'Rect(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', w=' + Kotlin.toString(this.w)) + (', h=' + Kotlin.toString(this.h)) + (', number=' + Kotlin.toString(this.number)) + (', selected=' + Kotlin.toString(this.selected)) + ')';
  };
  Keno$Rect.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.w) | 0;
    result = result * 31 + Kotlin.hashCode(this.h) | 0;
    result = result * 31 + Kotlin.hashCode(this.number) | 0;
    result = result * 31 + Kotlin.hashCode(this.selected) | 0;
    return result;
  };
  Keno$Rect.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.w, other.w) && Kotlin.equals(this.h, other.h) && Kotlin.equals(this.number, other.number) && Kotlin.equals(this.selected, other.selected)))));
  };
  function Keno$Button(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
  }
  Keno$Button.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Button',
    interfaces: []
  };
  Keno$Button.prototype.component1 = function () {
    return this.x;
  };
  Keno$Button.prototype.component2 = function () {
    return this.y;
  };
  Keno$Button.prototype.component3 = function () {
    return this.w;
  };
  Keno$Button.prototype.component4 = function () {
    return this.h;
  };
  Keno$Button.prototype.component5 = function () {
    return this.type;
  };
  Keno$Button.prototype.copy_qiexj8$ = function (x, y, w, h, type) {
    return new Keno$Button(x === void 0 ? this.x : x, y === void 0 ? this.y : y, w === void 0 ? this.w : w, h === void 0 ? this.h : h, type === void 0 ? this.type : type);
  };
  Keno$Button.prototype.toString = function () {
    return 'Button(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', w=' + Kotlin.toString(this.w)) + (', h=' + Kotlin.toString(this.h)) + (', type=' + Kotlin.toString(this.type)) + ')';
  };
  Keno$Button.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.w) | 0;
    result = result * 31 + Kotlin.hashCode(this.h) | 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    return result;
  };
  Keno$Button.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.w, other.w) && Kotlin.equals(this.h, other.h) && Kotlin.equals(this.type, other.type)))));
  };
  Keno.prototype.format_j6vyb1$ = function ($receiver, digits) {
    return $receiver.toFixed(digits);
  };
  Keno.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Keno',
    interfaces: [GameCtrl$Game]
  };
  function main(args) {
    var ctrl = new GameCtrl();
    ctrl.onIntro();
    ctrl.onStart();
    ctrl.onInstructionsClick();
  }
  GameCtrl.Game = GameCtrl$Game;
  _.GameCtrl = GameCtrl;
  Object.defineProperty(Keno$GameState, 'Pick', {
    get: Keno$GameState$Pick_getInstance
  });
  Object.defineProperty(Keno$GameState, 'Drawing', {
    get: Keno$GameState$Drawing_getInstance
  });
  Object.defineProperty(Keno$GameState, 'AfterDraw', {
    get: Keno$GameState$AfterDraw_getInstance
  });
  Keno.GameState = Keno$GameState;
  Object.defineProperty(Keno$ButtonType, 'START', {
    get: Keno$ButtonType$START_getInstance
  });
  Object.defineProperty(Keno$ButtonType, 'QUICK_PICK', {
    get: Keno$ButtonType$QUICK_PICK_getInstance
  });
  Object.defineProperty(Keno$ButtonType, 'RESTART', {
    get: Keno$ButtonType$RESTART_getInstance
  });
  Keno.ButtonType = Keno$ButtonType;
  Keno.Rect = Keno$Rect;
  Keno.Button = Keno$Button;
  var package$kenologic = _.kenologic || (_.kenologic = {});
  package$kenologic.Keno = Keno;
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('ScratchCard', _);
  return _;
}(typeof ScratchCard === 'undefined' ? {} : ScratchCard, kotlin);
