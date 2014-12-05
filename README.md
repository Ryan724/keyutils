keyutils
========

JavaScript针对键盘事件监听处理的工具库

 keyUtils 是用js对键盘事件的监听
  依赖于jquery-2.0.0.js
  使用方法：
*  给按键绑定特定函数，例如：
```javascript
k.bind("shift",function(){
				//your code .....
});
```
*   在html页面元素中使用data-hotkey属性，并为该元素定义执行函数.当快捷键按下时，
  keyButils会自动触发其绑定事件的执行函数例如：
```html
<button id="btn" data-hotkey="shift+k,click"></button>
```
```javascript
js code:
$("#btn").click(function(){
    //your event  code.....
});
``` 		  
## Questions?

If you have any questions, please feel free to ask through [New Issue](https://github.com/Ryan724/keyutils/issues/new).
