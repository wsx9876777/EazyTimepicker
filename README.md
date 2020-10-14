## Welcome to GitHub Pages
### Installation
```markdown
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.7.1/svg.min.js"></script>
<script type="text/javascript" src="EazyTimepicker.js"></script>
```

### Usage
```markdown
var picker = new EazyTimepicker();
picker.Attach(["startTime","endTime"]);
picker.Init();
```
### Theming
```html
    <div id="EazyTimepicker_ds53513d1a_modal" class="EazyTimepicker-ds53513d1a-modal noselect">
        <div id="EazyTimepicker_ds53513d1a_backdrop" class="EazyTimepicker-ds53513d1a-backdrop"></div>
        <div id="EazyTimepicker_ds53513d1a" class="EazyTimepicker-ds53513d1a">
            <div class="EazyTimepicker-ds53513d1a-title">
                <span class="EazyTimepicker-ds53513d1a-close">x</span>
            </div>
            <div class="EazyTimepicker-ds53513d1a-timeBar">
                <div class="EazyTimepicker-ds53513d1a-hour">
                    <input id="EazyTimepicker_ds53513d1a_hour_input" class="EazyTimepicker-ds53513d1a-hour-input" type="number" />
                </div>
                <div class="EazyTimepicker-ds53513d1a-colon">:</div>
                <div class="EazyTimepicker-ds53513d1a-minute">
                    <input id="EazyTimepicker_ds53513d1a_minute_input" class="EazyTimepicker-ds53513d1a-minute-input" type="number" />
                </div>
            </div>
            <div id="EazyTimepicker_ds53513d1a_content" class="EazyTimepicker-ds53513d1a-content">
                <div class="EazyTimepicker-ds53513d1a-content-border">
                    <div id="EazyTimepicker_ds53513d1a_hour_timer" class="EazyTimepicker-ds53513d1a-hour-timer">
                        <svg id="EazyTimepicker_ds53513d1a_hour_timer_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ></svg>
                    </div>
                    <div id="EazyTimepicker_ds53513d1a_minute_timer" class="EazyTimepicker-ds53513d1a-minute-timer">
                        <svg id="EazyTimepicker_ds53513d1a_minute_timer_svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" ></svg>
                    </div>
                </div>
            </div>
            <div class="EazyTimepicker-ds53513d1a-footer">
                <span id="EazyTimepicker_ds53513d1a_ok_btn">OK</span>
                <span id="EazyTimepicker_ds53513d1a_close_btn">CANCEL</span>
            </div>
        </div>
    </div>
```
### [Demo](https://wsx9876777.github.io/EazyTimepicker/)
