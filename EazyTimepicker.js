var EazyTimepicker = function () {
    this._attachedInputText;
    this._ezPickerElement;
    this._inputHour;
    this._inputMinute;
};
(function () {

    function GetHourByTouchPosition(a, b, h) {
        //判斷是否過半，過半則進位
        if (b > 15) {
            a += 1;
        }
        //角度換算成時鐘時間
        if (a > 3) {
            a -= 3;
        } else {
            a = a + 9;
        }

        if (h < 85) {
            a += 12
        }

        if (a == 24) {
            a = 0;
        }
        return a;
    }

    function GetMinuteByPosition(a, b, h) {
        if (a > 14) {
            a -= 15;
        } else {
            a += 45;
        }
        return a;
    }

    function AddClass(dom, v_class) {
        var my_class = dom.getAttribute("class") || "";
        v_split = my_class.split(" ");
        if (v_split.length > 0) {
            for (var i = 0; i < v_split.length; i++) {
                if (my_class[i] === v_class) {
                    return;
                }
            }
            dom.setAttribute("class", my_class + " " + v_class);
        } else {
            dom.setAttribute("class", v_class);
        }
    }

    function RemoveClass(dom, v_class) {
        var my_class = dom.getAttribute("class") || "";
        if (my_class === v_class) {
            dom.removeAttribute("class");
        } else if (my_class.length > 0) {
            my_class = my_class.replace(" " + v_class, "");
            my_class = my_class.replace(v_class + " ", "");
            dom.setAttribute("class", my_class);
        }
    }

    function PositionHandler(pieces, distance, center) {
        this.positionCollection = [];
        this.pieces = pieces;
        this.c = Math.PI / 180;
        this.distance = distance;
        this.center = center; //[x,y]
        this.singleAngle = 360 / pieces;
    }
    function GetHourString(value) {
        var hour = parseInt(Math.abs(value));
        if (hour > 24) {
            hour = "00";
        } else if (hour < 10) {
            hour = "0" + hour;
        }
        return hour;
    }
    function GetMinutesString(value) {
        var minutes = parseInt(Math.abs(value));
        if (minutes > 59) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes;
    }
    function FormatStringToTime(val) {
        val = val || "00:00";
        var ary = val.split(":");
        var h = GetHourString(ary[0]);
        var m = GetMinutesString(ary[1]);
        return { hour: h, minute: m }
    }
    (function () {
        this.SetPieces = function (pieces) {
            this.pieces = pieces;
            this.singleAngle = 360 / pieces;
        };
        this.SetDistance = function (distance) {
            this.distance = distance;
        };
        this.moveTo = function (num) {
            var angle = (this.singleAngle * num); //圓上的角度
            var quadrant = parseInt(angle / 90); //象限
            angle = angle % 90; //換算角度
            this.x = this.center[0];
            this.y = this.center[1];
            this.a = this.distance * Math.cos(this.c * angle);
            this.b = this.distance * Math.sin(this.c * angle);
            switch (quadrant) {
                case 0:
                    this.x = this.x + this.b;
                    this.y = this.y - this.a;
                    break;
                case 1:
                    this.x = this.x + this.a;
                    this.y = this.y + this.b;
                    break;
                case 2:
                    this.x = this.x - this.b;
                    this.y = this.y + this.a;
                    break;
                case 3:
                    this.x = this.x - this.a;
                    this.y = this.y - this.b;
                    break;
            };

        };
        this.getPosition = function (num) {
            this.moveTo(num);
            return { x: this.x, y: this.y };
        }
    }).call(PositionHandler.prototype);

    function DrawCircle(draw, diameter, fillColor, positionHandler) {
        this.draw = draw;
        this.diameter = diameter;
        this.fillColor = fillColor;
        this.positionHandler = positionHandler;
        this.DrawSamllCircleAndText;
        this.AbstractGetByPosition;
        this._drawId = draw.node.id;
        this._circle;
    }
    (function () {
        this.ConvertPositionToAngle = function (centerX, centerY, targetX, targetY) {
            var res = (Math.atan2(targetY - centerY, targetX - centerX)) / Math.PI * 180.0;
            return res + 180;
        }
        this.GetNumByPosition = function (pieceOfAngle, radius, e) {
            var angle = this.ConvertPositionToAngle(radius, radius, e.offsetX, e.offsetY),
                a, b, c = (e.offsetX - radius),
                d = (e.offsetY - radius),
                h = Math.sqrt((c * c) + (d * d));
            a = parseInt(angle / pieceOfAngle);
            b = Math.abs(angle % pieceOfAngle);
            var num = this.AbstractGetByPosition(a, b, h);

            return num;
        }
        this.OnCircleMove = function (svgText) {
            return
            var svgCircle = svgText.svgCircle;

            if (_selectedHour) {
                if (_selectedHour.id === svgText.node.id) {
                    return;
                }
                RemoveClass(_selectedHour, "in");
                RemoveClass(_selectedHour.previousSibling, "in");
            }
            AddClass(svgText.node, "in");
            AddClass(svgCircle.node, "in");
        }
        this.BindSamllCircleAndText = function (object) {
            this.DrawSamllCircleAndText = object;
        }
        this.GetCircle = function(){
            return this._circle;
        }
        this.render = function () {
            this._circle = circle = this.draw.circle(this.diameter).fill(this.fillColor) //圓餅
            var $this = this;
            var angle = 360 / this.positionHandler.pieces;
            var timer = document.getElementById("EazyTimepicker_ds53513d1a");//for touch
            var radius = this.diameter / 2;
            circle.mousedown(function () {
                _lineOn = true;
            }).touchstart(function () {
                _lineOn = true;
            }).mousemove(function (e) {
                if (!_lineOn) {
                    return false
                }
                var hour = $this.GetNumByPosition(angle, radius, e),
                    svgTextId = $this._drawId + "Text" + hour,
                    svgText = SVG.get(svgTextId);
                $this.DrawSamllCircleAndText.MoveToText(svgText, "mousemove");

            }).touchmove(function (e,x) {
                if (!_lineOn) {
                    return false
                }
                if (e.detail) {
                    e = e.detail;
                }
                var touch = e.touches[0] || e.changedTouches[0],
                    //elm = $(this.node).offset(),
                    hour = $this.GetNumByPosition(angle, radius, {
                        offsetX: touch.clientX - timer.offsetLeft - 20,
                        //100 = title+bar+timer margin
                        offsetY: touch.clientY - timer.offsetTop - 100
                    }),
                    svgTextId = $this._drawId + "Text" + hour,
                    svgText = SVG.get(svgTextId);
                //$this.OnCircleMove(svgText);
                $this.DrawSamllCircleAndText.MoveToText(svgText, "circle touchmove");
            }).click(function (e) {
                var hour = $this.GetNumByPosition(angle, radius, e),
                    svgTextId = $this._drawId + "Text" + hour,
                    svgText = SVG.get(svgTextId);
                //$this.OnCircleMove(svgText);
                $this.DrawSamllCircleAndText.MoveToText(svgText, "circle click");
            });
        }
    }).call(DrawCircle.prototype);

    function DrawSamllCircleAndText
        (draw, radius, lineObj, textAry, positionHandler, input, selectedObj) {
        this.draw = draw;
        this.radius = radius;
        this.textAry = textAry;
        this._drawId = draw.node.id;
        this._line = lineObj.GetLine();
        this._input = input;
        this._positionHandler = positionHandler;
        this._selectedObj = selectedObj;
    }
    (function () {
        this.DrawSmallCircle = function (position, str, visible) {
            if (visible === undefined) {
                visible = true;
            }

            var smallCircle = this.draw.circle(28);
            var $this = this;
            str = parseInt(str);
            smallCircle.node.id = this._drawId + "smallCircle" + str;
            smallCircle.timeText = str;
            smallCircle.coordinates = position;
            //smallCircle.svgText = text;
            if (!visible) {
                smallCircle.addClass("invisible");
            }
            smallCircle.move(position.x - 14, position.y - 14).fill('#fff').addClass('hourCircle')
                .mousedown(function (e) {
                    _lineOn = true;
                }).mouseover(function () {
                    if (_lineOn) {
                        var svgText = SVG.get($this._drawId + "Text" + this.timeText);
                        $this.MoveToText(svgText, "smallCircle mouseover");
                    }
                }).touchstart(function () {
                    _lineOn = true;
                }).click(function (e) {
                    var svgText = SVG.get($this._drawId + "Text" + this.timeText);
                    $this.MoveToText(svgText, "smallCircle click");
                });
        }
        this.DrawText = function (position, str, visible) {
            if (visible === undefined) {
                visible = true;
            }
            var $this = this;
            var text = this.draw.text(function (add) {
                if (str.toString().length > 1) {
                    add.tspan(str).dx(-10);
                } else {
                    add.tspan(str).dx(-5);
                }
            });
            text.node.id = this._drawId + "Text" + parseInt(str);
            text.coordinates = position;
            text.timeText = str;

            if (!visible) {
                text.addClass("invisible");
            }
            text.move(position.x, position.y + 5).addClass('hourText')
                .mousedown(function (e) {
                    _lineOn = true;
                }).touchstart(function () {
                    _lineOn = true;
                }).click(function () {
                    $this.MoveToText(this, "text click");
                });
        }
        this.SetTextAry = function (ary) {
            this.textAry = ary;
        }
        this.MoveToText = function (dom, from) {
            var text = dom;
            if (this._selectedObj.selected) {
                if (this._selectedObj.selected.id === text.node.id) {
                    return;
                }
                RemoveClass(this._selectedObj.selected, "in");
                RemoveClass(this._selectedObj.selected.previousSibling, "in");
            }
            AddClass(text.node, "in");
            AddClass(text.node.previousSibling, "in");
            this._selectedObj.selected = text.node;
            this._line.plot(
                this.radius,
                this.radius,
                text.coordinates.x,
                text.coordinates.y);
            var hour_str = text.timeText;
            if (hour_str < 10) {
                hour_str = "0" + hour_str;
            }
            this._input.value = hour_str;
        };
        this.MoveToTimeByNumber = function (hour) {
            var num = hour;
            if (typeof (num) != "number") {
                num = parseInt(hour);
            }
            if (isNaN(num)) { num = 0; }
            var svgText = SVG.get(this._drawId + "Text" + num);
            this.MoveToText(svgText, "MoveToTimeByNumber");
        }
        this.render = function () {
            var position;
            for (var i = 0; i < this._positionHandler.pieces; i++) {
                position = this._positionHandler.getPosition(i);
                this.DrawSmallCircle(position, this.textAry[i]);
                this.DrawText(position, this.textAry[i]);
            }
        }
        this.minutesRender = function () {
            var position;
            var visible;
            for (var i = 0; i < this._positionHandler.pieces; i++) {
                position = this._positionHandler.getPosition(i);
                visible = i % 5 === 0;
                this.DrawSmallCircle(position, this.textAry[i], visible);
                this.DrawText(position, this.textAry[i], visible);
            }
        }
    }).call(DrawSamllCircleAndText.prototype);

    function DrawLine(draw, radius, strokeStyle) {
        this.draw = draw;
        this.radius = radius;
        this.strokeStyle = strokeStyle;
        this.line;
    }
    (function () {
        this.render = function () {
            this.line = this.draw.line(
                this.radius, //x1
                this.radius, //y1
                this.radius, //x2
                20) //y2
                .stroke(this.strokeStyle);

            this.line.mousedown(function () {
                _lineOn = true;
            }).touchstart(function () {
                _lineOn = true;
            });
        }
        this.GetLine = function () {
            return this.line;
        }
    }).call(DrawLine.prototype);

    var _ezPickerElement,
        _diameter = 260, //直徑
        _TimePickerSvgId = "EazyTimepicker_ds53513d1a_hour_timer_svg",
        _minuteTimePickerSvgId = "EazyTimepicker_ds53513d1a_minute_timer_svg",
        _lineOn = false,
        _hourPickerElement,
        _minutePickerElement,
        _inputHour,
        _inputMinute,
        _closeBtn,
        _okBtn,
        _inputTime,
        _hourHandStroke = { //時針
            color: '#8ac24b',
            width: 2,
            linecap: 'round'
        },
        _hourCircleStyle = {
            color: "#fff",
            width: 260,
            get radius() { return _diameter / 2; }
        };
    this.Init = function () {
        var $this = this;
        this._ezPickerElement = _ezPickerElement = document.getElementById("EazyTimepicker_ds53513d1a_modal");
        _hourPickerElement = document.getElementById('EazyTimepicker_ds53513d1a_hour_timer');
        _minutePickerElement = document.getElementById('EazyTimepicker_ds53513d1a_minute_timer');
        this._inputHour = _inputHour = document.getElementById('EazyTimepicker_ds53513d1a_hour_input');
        this._inputMinute = _inputMinute = document.getElementById('EazyTimepicker_ds53513d1a_minute_input');
        _closeBtn = document.getElementById('EazyTimepicker_ds53513d1a_close_btn');
        _okBtn = document.getElementById('EazyTimepicker_ds53513d1a_ok_btn');
        _inputTime = document.getElementById(this._inputTimeId);
        /***** TimePicker init********/
        var radius = _hourCircleStyle.width / 2;
        var diameter = _hourCircleStyle.width;
        //get PositionHandler for compute text position
        var hourPositionHandler = new PositionHandler(12, radius - 15, [radius, radius]);
        /**** hour ***/
        //先定義SVG大小
        var draw = SVG(_TimePickerSvgId).size(diameter, diameter);
        //draw circle
        var drawCircle = new DrawCircle(draw, diameter, _hourCircleStyle.color, hourPositionHandler)
        drawCircle.AbstractGetByPosition = GetHourByTouchPosition;
        drawCircle.render();
        //畫時針
        var hourline = new DrawLine(draw, radius, _hourHandStroke);
        hourline.render();
        //畫中心點circle
        draw.circle(16).move(radius - 8, radius - 8).fill('gray');
        //draw text 0 ~ 12
        var textAry = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var selectedHour = { selected: null };
        var hourDraw = new DrawSamllCircleAndText(draw, radius, hourline, textAry, hourPositionHandler, _inputHour, selectedHour);
        hourDraw.render();
        /*12 ~ 24*/
        hourPositionHandler.SetDistance(70);
        textAry = ["00", 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        hourDraw.SetTextAry(textAry);
        //hourDraw.SetlineLength(70);
        hourDraw.render();
        //bind SamllCircleAndText event
        drawCircle.BindSamllCircleAndText(hourDraw);

        /***** Minute TimePicker init********/
        //get PositionHandler for compute text position
        var minutePositionHandler = new PositionHandler(60, radius - 15, [radius, radius]);
        //先定義SVG大小
        var minuteDraw = SVG(_minuteTimePickerSvgId).size(diameter, diameter);
        //draw circle
        var minuteDrawCircle = new DrawCircle(minuteDraw, diameter, _hourCircleStyle.color, minutePositionHandler)
        minuteDrawCircle.AbstractGetByPosition = GetMinuteByPosition;
        minuteDrawCircle.render();
        //畫分針
        var minuteline = new DrawLine(minuteDraw, radius, _hourHandStroke);
        minuteline.render();
        //畫中心點circle
        minuteDraw.circle(16).move(radius - 8, radius - 8).fill('gray');
        //draw text 0 ~ 12
        var mTextAry = (function () {
            var ary = [];
            for (let i = 0; i < 60; i++) {
                ary.push(i);
            }
            return ary;
        })();
        var selectedMinutes = { selected: null };
        var minuteDrawItem = new DrawSamllCircleAndText(minuteDraw, radius, minuteline, mTextAry, minutePositionHandler, _inputMinute, selectedMinutes);
        minuteDrawItem.minutesRender();
        minuteDrawCircle.BindSamllCircleAndText(minuteDrawItem);
        /*********window event */
        window.onmouseup = function () {
            _lineOn = false;
        };

        var hourCircle = drawCircle.GetCircle();
        window.ontouchmove = function (e) {
            if (_lineOn) {
                hourCircle.fire("touchmove",e);
            }
        };

        window.ontouchend = function () {
            _lineOn = false;
        };
        /****************************/
        //hour input
        AddClass(_hourPickerElement, "in");

        _inputHour.onfocus = function () {
            AddClass(_hourPickerElement, "in");
            RemoveClass(_minutePickerElement, "in");
        };

        _inputHour.onchange = function (e) {
            var hour = GetHourString(this.value);
            this.value = hour;
            hourDraw.MoveToTimeByNumber(hour);
        };

        _inputMinute.onfocus = function () {
            AddClass(_minutePickerElement, "in");
            RemoveClass(_hourPickerElement, "in");
        };

        _inputMinute.onchange = function (e) {
            var hour = GetMinutesString(this.value);
            this.value = hour;
            minuteDrawItem.MoveToTimeByNumber(hour);
        };

        _closeBtn.onclick = function () {
            AddClass(_hourPickerElement, "in");
            RemoveClass(_minutePickerElement, "in");
            RemoveClass(_ezPickerElement, 'in');
        };

        _okBtn.onclick = function () {
            var input = $this._attachedInput;
            var a = _inputHour.value,
                b = _inputMinute.value,
                c = "";
            if (a.length === 0 && b.length === 0) {
                c = "";
            } else {
                c = a + ":" + b
            }
            input.value = c;
            _closeBtn.onclick();
        }
        /*
        $argoTimePicker_public.inputmask({
            element: _inputHour,
            regex: /^\d+$/
        })*/

    }
    this.OpenPicker = function () {
        var val = this._attachedInput.value;
        var obj = FormatStringToTime(val);
        this._inputHour.value = obj.hour;
        this._inputMinute.value = obj.minute;
        this._inputHour.onchange();
        this._inputMinute.onchange();
        AddClass(this._ezPickerElement, 'in');
    }
    this.ClosePicker = function () {
        RemoveClass(this._ezPickerElement, 'in');
    }
    this.Attach = function (ary) {
        var $this = this;
        for (let i = 0; i < ary.length; i++) {
            var dom = document.getElementById(ary[i]);
            if (dom.onfocus === null) {
                dom.onfocus = function () {
                    $this._attachedInput = document.getElementById(this.id);
                    $this.OpenPicker();
                }
            }
        }
    }

}).call(EazyTimepicker.prototype);