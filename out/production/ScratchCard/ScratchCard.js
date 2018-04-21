if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'ScratchCard'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'ScratchCard'.");
}
var ScratchCard = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var throwUPAE = Kotlin.throwUPAE;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var intersect = Kotlin.kotlin.collections.intersect_q4559j$;
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var throwCCE = Kotlin.throwCCE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var math = Kotlin.kotlin.math;
  var sortedDescending = Kotlin.kotlin.collections.sortedDescending_exjks8$;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var mapOf = Kotlin.kotlin.collections.mapOf_x2b85n$;
  var mapOf_0 = Kotlin.kotlin.collections.mapOf_qfcya0$;
  var emptyMap = Kotlin.kotlin.collections.emptyMap_q3lmfv$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  GameState.prototype = Object.create(Enum.prototype);
  GameState.prototype.constructor = GameState;
  Selectable.prototype = Object.create(Collider.prototype);
  Selectable.prototype.constructor = Selectable;
  PlayButton.prototype = Object.create(Selectable.prototype);
  PlayButton.prototype.constructor = PlayButton;
  QuickPickButton.prototype = Object.create(Selectable.prototype);
  QuickPickButton.prototype.constructor = QuickPickButton;
  ClearButton.prototype = Object.create(Selectable.prototype);
  ClearButton.prototype.constructor = ClearButton;
  NumberPosition.prototype = Object.create(Selectable.prototype);
  NumberPosition.prototype.constructor = NumberPosition;
  Round.prototype = Object.create(Selectable.prototype);
  Round.prototype.constructor = Round;
  Keno$GameState.prototype = Object.create(Enum.prototype);
  Keno$GameState.prototype.constructor = Keno$GameState;
  Keno$ButtonType.prototype = Object.create(Enum.prototype);
  Keno$ButtonType.prototype.constructor = Keno$ButtonType;
  function Game() {
    this.view_rsna7o$_0 = this.view_rsna7o$_0;
    this.presenter_8j7nob$_0 = this.presenter_8j7nob$_0;
  }
  function Game$Presenter() {
  }
  Game$Presenter.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Presenter',
    interfaces: []
  };
  function Game$View() {
  }
  Game$View.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'View',
    interfaces: []
  };
  Object.defineProperty(Game.prototype, 'view', {
    get: function () {
      if (this.view_rsna7o$_0 == null)
        return throwUPAE('view');
      return this.view_rsna7o$_0;
    },
    set: function (view) {
      this.view_rsna7o$_0 = view;
    }
  });
  Object.defineProperty(Game.prototype, 'presenter', {
    get: function () {
      if (this.presenter_8j7nob$_0 == null)
        return throwUPAE('presenter');
      return this.presenter_8j7nob$_0;
    },
    set: function (presenter) {
      this.presenter_8j7nob$_0 = presenter;
    }
  });
  function Game$onStart$lambda(this$Game) {
    return function (it) {
      this$Game.view.resize();
      return Unit;
    };
  }
  Game.prototype.onStart = function () {
    this.presenter = new KenoPresenter();
    this.view = KenoView_init(this.presenter);
    this.presenter.addView_37c0vm$(this.view);
    this.view.onStart();
    window.addEventListener('resize', Game$onStart$lambda(this));
  };
  Game.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Game',
    interfaces: []
  };
  function GameState(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function GameState_initFields() {
    GameState_initFields = function () {
    };
    GameState$PICKS_instance = new GameState('PICKS', 0);
    GameState$DRAWING_instance = new GameState('DRAWING', 1);
    GameState$POSTDRAW_instance = new GameState('POSTDRAW', 2);
  }
  var GameState$PICKS_instance;
  function GameState$PICKS_getInstance() {
    GameState_initFields();
    return GameState$PICKS_instance;
  }
  var GameState$DRAWING_instance;
  function GameState$DRAWING_getInstance() {
    GameState_initFields();
    return GameState$DRAWING_instance;
  }
  var GameState$POSTDRAW_instance;
  function GameState$POSTDRAW_getInstance() {
    GameState_initFields();
    return GameState$POSTDRAW_instance;
  }
  GameState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameState',
    interfaces: [Enum]
  };
  function GameState$values() {
    return [GameState$PICKS_getInstance(), GameState$DRAWING_getInstance(), GameState$POSTDRAW_getInstance()];
  }
  GameState.values = GameState$values;
  function GameState$valueOf(name) {
    switch (name) {
      case 'PICKS':
        return GameState$PICKS_getInstance();
      case 'DRAWING':
        return GameState$DRAWING_getInstance();
      case 'POSTDRAW':
        return GameState$POSTDRAW_getInstance();
      default:throwISE('No enum constant keno.GameState.' + name);
    }
  }
  GameState.valueOf_61zpoe$ = GameState$valueOf;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function KenoPresenter() {
    this.view_i1nezj$_0 = this.view_i1nezj$_0;
    this.playableNumbers = ArrayList_init();
    this.drawnNumbers = ArrayList_init();
    this.rounds = 1;
  }
  Object.defineProperty(KenoPresenter.prototype, 'view', {
    get: function () {
      if (this.view_i1nezj$_0 == null)
        return throwUPAE('view');
      return this.view_i1nezj$_0;
    },
    set: function (view) {
      this.view_i1nezj$_0 = view;
    }
  });
  KenoPresenter.prototype.addView_37c0vm$ = function (view) {
    this.view = view;
  };
  KenoPresenter.prototype.drawNumbers = function () {
    if (this.playableNumbers.isEmpty())
      return;
    this.executeRound_za3lpa$(this.rounds - 1 | 0);
  };
  function KenoPresenter$executeRound$lambda$lambda(this$KenoPresenter, closure$round) {
    return function () {
      this$KenoPresenter.drawnNumbers.clear();
      this$KenoPresenter.view.redraw_pqoyrt$(this$KenoPresenter.playableNumbers);
      this$KenoPresenter.executeRound_za3lpa$(closure$round - 1 | 0);
      return Unit;
    };
  }
  function KenoPresenter$executeRound$lambda(this$KenoPresenter, closure$round) {
    return function () {
      this$KenoPresenter.view.setGameState_2mgmwk$(GameState$DRAWING_getInstance());
      while (this$KenoPresenter.drawnNumbers.size < 15) {
        var pick = Math.floor(Math.random() * Math.floor(80) + 1);
        while (this$KenoPresenter.drawnNumbers.contains_11rb$(pick)) {
          pick = Math.floor(Math.random() * Math.floor(80) + 1);
        }
        this$KenoPresenter.drawnNumbers.add_11rb$(pick);
      }
      var hits = intersect(this$KenoPresenter.playableNumbers, this$KenoPresenter.drawnNumbers);
      this$KenoPresenter.view.drawnNumbers_un9m8i$(this$KenoPresenter.drawnNumbers, hits);
      if (closure$round > 0) {
        return window.setTimeout(KenoPresenter$executeRound$lambda$lambda(this$KenoPresenter, closure$round), 1000);
      }
       else {
        return this$KenoPresenter.view.setGameState_2mgmwk$(GameState$POSTDRAW_getInstance()), Unit;
      }
    };
  }
  KenoPresenter.prototype.executeRound_za3lpa$ = function (round) {
    window.setTimeout(KenoPresenter$executeRound$lambda(this, round), 2500);
  };
  KenoPresenter.prototype.clearDrawn = function () {
    this.view.setGameState_2mgmwk$(GameState$PICKS_getInstance());
    this.view.redraw_pqoyrt$(this.playableNumbers);
    this.drawnNumbers.clear();
  };
  KenoPresenter.prototype.quickPicks = function () {
    this.view.setGameState_2mgmwk$(GameState$PICKS_getInstance());
    if (this.playableNumbers.size === 15) {
      this.clearAll();
    }
    while (this.playableNumbers.size < 15) {
      var pick = Math.floor(Math.random() * Math.floor(80) + 1);
      while (this.playableNumbers.contains_11rb$(pick)) {
        pick = Math.floor(Math.random() * Math.floor(80) + 1);
      }
      this.playableNumbers.add_11rb$(pick);
    }
    this.view.select_hens66$(this.playableNumbers);
  };
  KenoPresenter.prototype.clearPicks = function () {
    this.view.setGameState_2mgmwk$(GameState$PICKS_getInstance());
    this.playableNumbers.clear();
    this.view.redraw_pqoyrt$(emptyList());
  };
  KenoPresenter.prototype.clearAll = function () {
    this.view.setGameState_2mgmwk$(GameState$PICKS_getInstance());
    this.playableNumbers.clear();
    this.drawnNumbers.clear();
    this.view.redraw_pqoyrt$(emptyList());
  };
  KenoPresenter.prototype.select_za3lpa$ = function (number) {
    var adding = !this.playableNumbers.contains_11rb$(number);
    if (adding) {
      if (this.playableNumbers.size < 15) {
        this.playableNumbers.add_11rb$(number);
        this.view.selectionUpdated();
      }
       else {
        adding = false;
      }
    }
     else {
      this.playableNumbers.remove_11rb$(number);
      this.view.selectionUpdated();
    }
    return adding;
  };
  KenoPresenter.prototype.getWager = function () {
    return 0.25;
  };
  KenoPresenter.prototype.getSelectionCount = function () {
    return this.playableNumbers.size;
  };
  KenoPresenter.prototype.setRounds_za3lpa$ = function (round) {
    this.rounds = round;
    this.view.drawRounds();
  };
  KenoPresenter.prototype.getCurrentRound = function () {
    return this.rounds;
  };
  KenoPresenter.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'KenoPresenter',
    interfaces: [Game$Presenter]
  };
  function KenoView() {
    this.playBtn = null;
    this.quickPick = null;
    this.clearBtn = null;
    this.canvas = null;
    this.ctx = null;
    this.presenter = null;
    this.payout = null;
    this.uiElements = ArrayList_init();
    this.positions = ArrayList_init();
    this.gameState = GameState$PICKS_getInstance();
  }
  function KenoView$ClickListener() {
  }
  KenoView$ClickListener.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'ClickListener',
    interfaces: []
  };
  function KenoView$onStart$lambda(this$KenoView) {
    return function (event) {
      this$KenoView.onClick_9ojx7i$(event);
      return Unit;
    };
  }
  KenoView.prototype.onStart = function () {
    var tmp$;
    this.playBtn = PlayButton_init(new Rectangle(0.0, 0.0, 5.0, 5.0), this.presenter);
    this.quickPick = QuickPickButton_init(new Rectangle(0.0, 0.0, 5.0, 5.0), this.presenter);
    this.clearBtn = ClearButton_init(new Rectangle(0.0, 0.0, 5.0, 5.0), this.presenter);
    this.payout = PayoutMenu_init(this.presenter);
    this.uiElements = mutableListOf([this.quickPick, this.playBtn, this.clearBtn]);
    for (var num = 1; num <= 80; num++) {
      this.positions.add_11rb$(this.drawPosition_yu0m8c$_0(num));
    }
    this.uiElements.addAll_brywnq$(this.positions);
    tmp$ = listOf([1, 5, 10, 25, 50]).iterator();
    while (tmp$.hasNext()) {
      var round = tmp$.next();
      this.uiElements.add_11rb$(this.drawRound_z8nih9$_0(round));
    }
    this.canvas.addEventListener('click', KenoView$onStart$lambda(this));
  };
  KenoView.prototype.drawRound_z8nih9$_0 = function (round) {
    var x = 127.0;
    var interval = 75.0;
    switch (round) {
      case 1:
        x = x + interval * 1;
        break;
      case 5:
        x = x + interval * 2;
        break;
      case 10:
        x = x + interval * 3;
        break;
      case 25:
        x = x + interval * 4;
        break;
      case 50:
        x = x + interval * 5;
        break;
    }
    var roundBtn = new Rectangle(x, 690.0, 50.0, 50.0);
    this.ctx.clearRect(roundBtn.x, roundBtn.y, roundBtn.w, roundBtn.h);
    if (this.presenter.getCurrentRound() === round) {
      this.ctx.fillStyle = '#F25C16';
    }
     else {
      this.ctx.fillStyle = '#000000';
    }
    this.ctx.fillRect(roundBtn.x, roundBtn.y, roundBtn.w, roundBtn.h);
    var rnd = Round_init(round, roundBtn, this.presenter);
    this.ctx.font = '14px Permanent Marker';
    if (this.presenter.getCurrentRound() === round) {
      this.ctx.fillStyle = '#000000';
    }
     else {
      this.ctx.fillStyle = '#FFFFFF';
    }
    this.ctx.fillText(round.toString() + ' X', x + 10, 720.0);
    return rnd;
  };
  KenoView.prototype.drawRounds = function () {
    var tmp$;
    tmp$ = listOf([1, 5, 10, 25, 50]).iterator();
    while (tmp$.hasNext()) {
      var round = tmp$.next();
      this.drawRound_z8nih9$_0(round);
    }
  };
  KenoView.prototype.onClick_9ojx7i$ = function (event) {
    var tmp$, tmp$_0, tmp$_1;
    Kotlin.isType(tmp$ = event, MouseEvent) ? tmp$ : throwCCE();
    var rect = this.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    tmp$_0 = this.uiElements.iterator();
    while (tmp$_0.hasNext()) {
      var view = tmp$_0.next();
      if ((Kotlin.isType(tmp$_1 = view, Collider) ? tmp$_1 : throwCCE()).collides_lu1900$(x, y)) {
        view.onClick_2mgmwk$(this.gameState);
        break;
      }
    }
  };
  KenoView.prototype.selectionUpdated = function () {
    ensureNotNull(this.payout).onDraw();
  };
  KenoView.prototype.setGameState_2mgmwk$ = function (state) {
    this.gameState = state;
  };
  KenoView.prototype.drawPosition_yu0m8c$_0 = function (num) {
    var np = NumberPosition_init(num, this.presenter);
    np.draw_vux9f0$(0, 0);
    return np;
  };
  var NoSuchElementException_init = Kotlin.kotlin.NoSuchElementException;
  KenoView.prototype.drawnNumbers_un9m8i$ = function (drawn, hits) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = drawn.iterator();
    while (tmp$.hasNext()) {
      var number = tmp$.next();
      var $receiver = this.positions;
      var first$result;
      first$break: do {
        var tmp$_2;
        tmp$_2 = $receiver.iterator();
        while (tmp$_2.hasNext()) {
          var element = tmp$_2.next();
          var tmp$_3;
          if ((Kotlin.isType(tmp$_3 = element, NumberPosition) ? tmp$_3 : throwCCE()).number === number) {
            first$result = element;
            break first$break;
          }
        }
        throw new NoSuchElementException_init('Collection contains no element matching the predicate.');
      }
       while (false);
      var target = first$result;
      if (hits.contains_11rb$(number)) {
        (Kotlin.isType(tmp$_0 = target, NumberPosition) ? tmp$_0 : throwCCE()).hit();
      }
       else {
        (Kotlin.isType(tmp$_1 = target, NumberPosition) ? tmp$_1 : throwCCE()).miss();
      }
    }
    return true;
  };
  KenoView.prototype.redraw_pqoyrt$ = function (numbers) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = this.positions.iterator();
    while (tmp$.hasNext()) {
      var position = tmp$.next();
      if (!numbers.contains_11rb$((Kotlin.isType(tmp$_0 = position, NumberPosition) ? tmp$_0 : throwCCE()).number)) {
        (Kotlin.isType(tmp$_1 = position, NumberPosition) ? tmp$_1 : throwCCE()).deselect();
      }
       else {
        (Kotlin.isType(tmp$_2 = position, NumberPosition) ? tmp$_2 : throwCCE()).select();
      }
    }
    ensureNotNull(this.payout).onDraw();
  };
  KenoView.prototype.select_hens66$ = function (playableNumbers) {
    var tmp$, tmp$_0;
    tmp$ = playableNumbers.iterator();
    while (tmp$.hasNext()) {
      var number = tmp$.next();
      var $receiver = this.positions;
      var first$result;
      first$break: do {
        var tmp$_1;
        tmp$_1 = $receiver.iterator();
        while (tmp$_1.hasNext()) {
          var element = tmp$_1.next();
          var tmp$_2;
          if ((Kotlin.isType(tmp$_2 = element, NumberPosition) ? tmp$_2 : throwCCE()).number === number) {
            first$result = element;
            break first$break;
          }
        }
        throw new NoSuchElementException_init('Collection contains no element matching the predicate.');
      }
       while (false);
      var target = first$result;
      (Kotlin.isType(tmp$_0 = target, NumberPosition) ? tmp$_0 : throwCCE()).select();
    }
    ensureNotNull(this.payout).onDraw();
  };
  KenoView.prototype.resize = function () {
  };
  KenoView.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'KenoView',
    interfaces: [Game$View]
  };
  function KenoView_init(presenter, $this) {
    $this = $this || Object.create(KenoView.prototype);
    KenoView.call($this);
    var tmp$, tmp$_0;
    $this.presenter = presenter;
    $this.gameState = GameState$PICKS_getInstance();
    $this.canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    $this.ctx = Kotlin.isType(tmp$_0 = $this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    return $this;
  }
  function Rectangle(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  Rectangle.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Rectangle',
    interfaces: []
  };
  Rectangle.prototype.component1 = function () {
    return this.x;
  };
  Rectangle.prototype.component2 = function () {
    return this.y;
  };
  Rectangle.prototype.component3 = function () {
    return this.w;
  };
  Rectangle.prototype.component4 = function () {
    return this.h;
  };
  Rectangle.prototype.copy_6y0v78$ = function (x, y, w, h) {
    return new Rectangle(x === void 0 ? this.x : x, y === void 0 ? this.y : y, w === void 0 ? this.w : w, h === void 0 ? this.h : h);
  };
  Rectangle.prototype.toString = function () {
    return 'Rectangle(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', w=' + Kotlin.toString(this.w)) + (', h=' + Kotlin.toString(this.h)) + ')';
  };
  Rectangle.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.w) | 0;
    result = result * 31 + Kotlin.hashCode(this.h) | 0;
    return result;
  };
  Rectangle.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.w, other.w) && Kotlin.equals(this.h, other.h)))));
  };
  function Collider(box) {
    this.box = box;
  }
  Collider.prototype.collides_lu1900$ = function (x, y) {
    var left = this.box.x;
    var right = this.box.x + this.box.w;
    var top = this.box.y;
    var bottom = this.box.y + this.box.h;
    if (right >= x && left <= x && bottom >= y && top <= y) {
      return true;
    }
    return false;
  };
  Collider.prototype.updateBox_gbt50$ = function (r) {
    this.box = r;
  };
  Collider.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Collider',
    interfaces: []
  };
  function Selectable(rect) {
    Collider.call(this, rect);
    this.rect = rect;
  }
  Selectable.prototype.onClick_2mgmwk$ = function (state) {
    switch (state.name) {
      case 'PICKS':
        this.onPicks();
        break;
      case 'DRAWING':
        this.onDrawing();
        break;
      case 'POSTDRAW':
        this.onRecap();
        break;
      default:Kotlin.noWhenBranchMatched();
        break;
    }
  };
  Selectable.prototype.updateBox_gbt50$ = function (r) {
    Collider.prototype.updateBox_gbt50$.call(this, r);
    this.rect = r;
  };
  Selectable.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Selectable',
    interfaces: [KenoView$ClickListener, Collider]
  };
  function PlayButton() {
    var tmp$, tmp$_0;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.ctx = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    this.presenter = null;
  }
  PlayButton.prototype.draw = function () {
    this.ctx.fillStyle = '#000000';
    var play = new Rectangle(975.0, 150.0, 70.0 * 1.618, 70.0);
    this.updateBox_gbt50$(play);
    this.ctx.fillRect(play.x, play.y, play.w, play.h);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '16px Permanent Marker';
    this.ctx.fillText('PLAY', 975 + 5.0, 200.0 + 3);
  };
  PlayButton.prototype.onDrawing = function () {
  };
  PlayButton.prototype.onRecap = function () {
    this.presenter.clearDrawn();
    this.presenter.drawNumbers();
  };
  PlayButton.prototype.onPicks = function () {
    this.presenter.drawNumbers();
  };
  PlayButton.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayButton',
    interfaces: [Selectable]
  };
  function PlayButton_init(dimensions, presenter, $this) {
    $this = $this || Object.create(PlayButton.prototype);
    Selectable.call($this, dimensions);
    PlayButton.call($this);
    $this.presenter = presenter;
    $this.draw();
    return $this;
  }
  function QuickPickButton() {
    var tmp$, tmp$_0;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.ctx = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    this.presenter = null;
  }
  QuickPickButton.prototype.draw = function () {
    this.ctx.fillStyle = '#000000';
    var play = new Rectangle(975.0, 250.0, 70.0 * 1.618, 70.0);
    this.updateBox_gbt50$(play);
    this.ctx.fillRect(play.x, play.y, play.w, play.h);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '16px Permanent Marker';
    this.ctx.fillText('Quick Pick', 975 + 5.0, 300.0 + 3);
  };
  QuickPickButton.prototype.onPicks = function () {
    this.presenter.quickPicks();
  };
  QuickPickButton.prototype.onDrawing = function () {
  };
  function QuickPickButton$onRecap$lambda(this$QuickPickButton) {
    return function () {
      this$QuickPickButton.presenter.quickPicks();
      return Unit;
    };
  }
  QuickPickButton.prototype.onRecap = function () {
    this.presenter.clearAll();
    window.setTimeout(QuickPickButton$onRecap$lambda(this), 250);
  };
  QuickPickButton.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'QuickPickButton',
    interfaces: [Selectable]
  };
  function QuickPickButton_init(dimensions, presenter, $this) {
    $this = $this || Object.create(QuickPickButton.prototype);
    Selectable.call($this, dimensions);
    QuickPickButton.call($this);
    $this.presenter = presenter;
    $this.draw();
    return $this;
  }
  function ClearButton() {
    var tmp$, tmp$_0;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.ctx = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    this.presenter = null;
  }
  ClearButton.prototype.draw = function () {
    this.ctx.fillStyle = '#000000';
    var play = new Rectangle(975.0, 350.0, 70.0 * 1.618, 70.0);
    this.updateBox_gbt50$(play);
    this.ctx.fillRect(play.x, play.y, play.w, play.h);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '16px Permanent Marker';
    this.ctx.fillText('Clear', 975 + 5.0, 400.0 + 3);
  };
  ClearButton.prototype.onPicks = function () {
    this.presenter.clearAll();
  };
  ClearButton.prototype.onDrawing = function () {
  };
  ClearButton.prototype.onRecap = function () {
    this.presenter.clearAll();
  };
  ClearButton.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ClearButton',
    interfaces: [Selectable]
  };
  function ClearButton_init(dimensions, presenter, $this) {
    $this = $this || Object.create(ClearButton.prototype);
    Selectable.call($this, dimensions);
    ClearButton.call($this);
    $this.presenter = presenter;
    $this.draw();
    return $this;
  }
  function NumberPosition() {
    this.number = 0;
    this.presenter = null;
    this.canvas = null;
    this.ctx = null;
    this.numberFont = '24px Lobster';
  }
  NumberPosition.prototype.onPicks = function () {
    var selectable = this.presenter.select_za3lpa$(this.number);
    if (selectable) {
      this.select();
    }
     else {
      this.deselect();
    }
  };
  NumberPosition.prototype.onDrawing = function () {
  };
  NumberPosition.prototype.onRecap = function () {
    this.presenter.clearDrawn();
    this.presenter.clearPicks();
    this.presenter.select_za3lpa$(this.number);
    this.select();
  };
  NumberPosition.prototype.draw_vux9f0$ = function (canvasWidth, canvasHieght) {
    var width = 10;
    var height = 8;
    var x = 0.0;
    var count = 0;
    while (x < width) {
      count = count + 1 | 0;
      var reset = count;
      var y = 0.0;
      while (y < height) {
        if (count === this.number) {
          this.drawReadySquare_lu1900$(x, y);
          return;
        }
         else {
          count = count + 10 | 0;
        }
        y = y + 1;
      }
      count = reset;
      x = x + 1;
    }
  };
  NumberPosition.prototype.select = function () {
    this.drawCircle_8sb99v$_0('#7187C5', '#FFFFFF');
  };
  NumberPosition.prototype.deselect = function () {
    this.draw_vux9f0$(0, 0);
  };
  NumberPosition.prototype.hit = function () {
    this.drawCircle_8sb99v$_0('#E4485D', '#F7EFF1');
  };
  NumberPosition.prototype.miss = function () {
    this.drawCircle_8sb99v$_0('#D9DFE8', '#47475C');
  };
  NumberPosition.prototype.drawCircle_8sb99v$_0 = function (circleColor, txtColor) {
    this.ctx.clearRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    var circleX = this.rect.x + this.rect.w * 0.5;
    var circleY = this.rect.y + this.rect.h * 0.5;
    this.ctx.fillStyle = circleColor;
    this.ctx.beginPath();
    this.ctx.arc(circleX, circleY, 30.0, 0.0, 2 * math.PI);
    this.ctx.fill();
    this.ctx.strokeStyle = circleColor;
    this.ctx.arc(circleX, circleY, 32.0, 0.0, 2 * math.PI);
    this.ctx.stroke();
    this.ctx.strokeStyle = txtColor;
    this.ctx.fillStyle = txtColor;
    this.ctx.font = this.numberFont;
    if (this.number < 10) {
      this.ctx.fillText(this.number.toString(), circleX - 10, circleY + 10);
    }
     else {
      this.ctx.fillText(this.number.toString(), circleX - 15, circleY + 10);
    }
  };
  NumberPosition.prototype.drawReadySquare_lu1900$ = function (x, y) {
    var over = 200;
    var down = 50;
    var length = 75.0;
    var r = new Rectangle(x * length + over, y * length + down, length, length);
    this.updateBox_gbt50$(r);
    var inset = 5;
    this.ctx.fillStyle = '#47475C';
    this.ctx.fillRect(this.box.x + inset, this.box.y + inset, this.box.w - inset, this.box.h - inset);
    this.ctx.font = this.numberFont;
    this.ctx.fillStyle = '#F7EFF1';
    if (this.number < 10) {
      this.ctx.fillText(this.number.toString(), this.box.x + length * 0.45, this.box.y + length * 0.625);
    }
     else {
      this.ctx.fillText(this.number.toString(), this.box.x + length * 0.35, this.box.y + length * 0.625);
    }
  };
  NumberPosition.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NumberPosition',
    interfaces: [Selectable]
  };
  function NumberPosition_init(number, presenter, $this) {
    $this = $this || Object.create(NumberPosition.prototype);
    Selectable.call($this, new Rectangle(0.0, 0.0, 0.0, 0.0));
    NumberPosition.call($this);
    var tmp$, tmp$_0;
    $this.number = number;
    $this.presenter = presenter;
    $this.canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    $this.ctx = Kotlin.isType(tmp$_0 = $this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    return $this;
  }
  function PayoutMenu() {
    this.canvas = null;
    this.ctx = null;
    this.presenter = null;
  }
  PayoutMenu.prototype.onDraw = function () {
    var tmp$;
    var x = 50.0;
    var y = 100.0;
    var over = 55;
    var down = 50;
    var length = 75.0;
    this.ctx.clearRect(x - 11, y - 20, x + 100, 150.0 + (15 * 25 | 0));
    var payouts = this.generatePayoutMap();
    this.ctx.font = '20px Permanent Marker';
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText('HIT', x - 10, y);
    this.ctx.fillText('PAYOUT', x + over, y);
    var sortedKeys = sortedDescending(payouts.keys);
    this.ctx.font = '16px Open Sans';
    tmp$ = sortedKeys.iterator();
    while (tmp$.hasNext()) {
      var key = tmp$.next();
      y += 25;
      this.ctx.fillText(key.toString(), x, y);
      this.ctx.fillText(format(ensureNotNull(payouts.get_11rb$(key)), 2), x + over, y);
    }
    for (var num = sortedKeys.size; num <= 10; num++) {
      y += 25;
      this.ctx.fillText('-', x, y);
      this.ctx.fillText('-', x + over + 15, y);
    }
  };
  PayoutMenu.prototype.generatePayoutMap = function () {
    var tmp$;
    var wager = this.presenter.getWager();
    switch (this.presenter.getSelectionCount()) {
      case 1:
        tmp$ = mapOf(to(1, wager * 3));
        break;
      case 2:
        tmp$ = mapOf(to(2, wager * 15));
        break;
      case 3:
        tmp$ = mapOf_0([to(3, wager * 45), to(2, wager * 2)]);
        break;
      case 4:
        tmp$ = mapOf_0([to(4, wager * 155), to(3, wager * 5), to(2, wager * 1)]);
        break;
      case 5:
        tmp$ = mapOf_0([to(5, wager * 850), to(4, wager * 15), to(3, wager * 2)]);
        break;
      case 6:
        tmp$ = mapOf_0([to(6, wager * 2000), to(5, wager * 111), to(4, wager * 6), to(3, wager * 1)]);
        break;
      case 7:
        tmp$ = mapOf_0([to(7, wager * 8000), to(6, wager * 450), to(5, wager * 32), to(4, wager * 2)]);
        break;
      case 8:
        tmp$ = mapOf_0([to(8, wager * 30000), to(7, wager * 1700), to(6, wager * 135), to(5, wager * 10)]);
        break;
      case 9:
        tmp$ = mapOf_0([to(9, wager * 50000), to(8, wager * 4000), to(7, wager * 310), to(6, wager * 62), to(5, wager * 6)]);
        break;
      case 10:
        tmp$ = mapOf_0([to(10, wager * 100000), to(9, wager * 10000), to(8, wager * 12000), to(7, wager * 180), to(6, wager * 26), to(5, wager * 2)]);
        break;
      case 11:
        tmp$ = mapOf_0([to(11, wager * 100000), to(10, wager * 25000), to(9, wager * 2500), to(8, wager * 500), to(7, wager * 100), to(6, wager * 13)]);
        break;
      case 12:
        tmp$ = mapOf_0([to(12, wager * 100000), to(11, wager * 25000), to(10, wager * 5000), to(9, wager * 1200), to(8, wager * 270), to(7, wager * 45), to(6, wager * 6)]);
        break;
      case 13:
        tmp$ = mapOf_0([to(13, wager * 100000), to(12, wager * 50000), to(11, wager * 15000), to(10, wager * 4500), to(9, wager * 800), to(8, wager * 90), to(7, wager * 23), to(6, wager * 2), to(0, wager * 2)]);
        break;
      case 14:
        tmp$ = mapOf_0([to(14, wager * 100000), to(13, wager * 50000), to(12, wager * 25000), to(11, wager * 10000), to(10, wager * 1500), to(9, wager * 375), to(8, wager * 50), to(7, wager * 10), to(6, wager * 2), to(0, wager * 2)]);
        break;
      case 15:
        tmp$ = mapOf_0([to(15, wager * 100000), to(14, wager * 100000), to(13, wager * 50000), to(12, wager * 25000), to(11, wager * 2800), to(10, wager * 600), to(9, wager * 140), to(8, wager * 30), to(7, wager * 12), to(6, wager * 2), to(0, wager * 2)]);
        break;
      default:tmp$ = emptyMap();
        break;
    }
    return tmp$;
  };
  PayoutMenu.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PayoutMenu',
    interfaces: []
  };
  function PayoutMenu_init(presenter, $this) {
    $this = $this || Object.create(PayoutMenu.prototype);
    PayoutMenu.call($this);
    var tmp$, tmp$_0;
    $this.canvas = Kotlin.isType(tmp$ = document.getElementById('game'), HTMLCanvasElement) ? tmp$ : throwCCE();
    $this.ctx = Kotlin.isType(tmp$_0 = $this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    $this.presenter = presenter;
    $this.onDraw();
    return $this;
  }
  function Round() {
    this.presenter = null;
    this.round = 0;
  }
  Round.prototype.onPicks = function () {
    this.presenter.setRounds_za3lpa$(this.round);
  };
  Round.prototype.onDrawing = function () {
  };
  Round.prototype.onRecap = function () {
    this.presenter.setRounds_za3lpa$(this.round);
  };
  Round.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Round',
    interfaces: [Selectable]
  };
  function Round_init(round, dimensions, presenter, $this) {
    $this = $this || Object.create(Round.prototype);
    Selectable.call($this, dimensions);
    Round.call($this);
    $this.presenter = presenter;
    $this.round = round;
    return $this;
  }
  function format($receiver, digits) {
    return $receiver.toFixed(digits);
  }
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
      default:throwISE('No enum constant keno.Keno.GameState.' + name);
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
      default:throwISE('No enum constant keno.Keno.ButtonType.' + name);
    }
  }
  Keno$ButtonType.valueOf_61zpoe$ = Keno$ButtonType$valueOf;
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
  Keno$Button.prototype.copy_df2hgc$ = function (x, y, w, h, type) {
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
    interfaces: []
  };
  function main(args) {
    var keno = new Game();
    keno.onStart();
  }
  Game.Presenter = Game$Presenter;
  Game.View = Game$View;
  var package$keno = _.keno || (_.keno = {});
  package$keno.Game = Game;
  Object.defineProperty(GameState, 'PICKS', {
    get: GameState$PICKS_getInstance
  });
  Object.defineProperty(GameState, 'DRAWING', {
    get: GameState$DRAWING_getInstance
  });
  Object.defineProperty(GameState, 'POSTDRAW', {
    get: GameState$POSTDRAW_getInstance
  });
  package$keno.GameState = GameState;
  package$keno.KenoPresenter = KenoPresenter;
  KenoView.ClickListener = KenoView$ClickListener;
  package$keno.KenoView_init_lyl00v$ = KenoView_init;
  package$keno.KenoView = KenoView;
  package$keno.Rectangle = Rectangle;
  package$keno.Collider = Collider;
  package$keno.Selectable = Selectable;
  package$keno.PlayButton_init_f5lchb$ = PlayButton_init;
  package$keno.PlayButton = PlayButton;
  package$keno.QuickPickButton_init_f5lchb$ = QuickPickButton_init;
  package$keno.QuickPickButton = QuickPickButton;
  package$keno.ClearButton_init_f5lchb$ = ClearButton_init;
  package$keno.ClearButton = ClearButton;
  package$keno.NumberPosition_init_8teplh$ = NumberPosition_init;
  package$keno.NumberPosition = NumberPosition;
  package$keno.PayoutMenu_init_lyl00v$ = PayoutMenu_init;
  package$keno.PayoutMenu = PayoutMenu;
  package$keno.Round_init_9zacc9$ = Round_init;
  package$keno.Round = Round;
  package$keno.format_j6vyb1$ = format;
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
  package$keno.Keno = Keno;
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('ScratchCard', _);
  return _;
}(typeof ScratchCard === 'undefined' ? {} : ScratchCard, kotlin);
