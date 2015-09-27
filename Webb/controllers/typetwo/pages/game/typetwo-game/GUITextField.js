'use strict';

var GUITextField = function()
{
	function GUITextField(bounds, submitCallback, isHidden)
	{
		GUIElement.call(this);
		
		this.setBounds(bounds);

		this._submitCallback = submitCallback || this._submitCallback;
		this._isHidden = (isHidden === true || isHidden === false) ? isHidden : this._isHidden;
	}


	$.extend(GUITextField.prototype, GUIElement.prototype,
	{	
		text: '',
		_submitCallback: function(){},
		_isHidden: false,
		_textMask: '',
		
		
		_renderCurrent: function(ct, transform)
		{			
			ct.fillStyle = 'white';
			ct.fillRect(transform.x, transform.y, this._bounds.width, this._bounds.height);
			
			if(this.text.length > 0)
			{
				ct.fillStyle = 'black';
				ct.textBaseline = "middle";
				if(this._isHidden)
					ct.fillText(new Array(this.text.length + 1).join("*"), transform.x + ct.lineWidth * 5, transform.y + this._bounds.height / 2);
				else
					ct.fillText(this.text, transform.x + ct.lineWidth * 5, transform.y + this._bounds.height / 2);
			}

			if(this._isActivated)
			{
				ct.strokeStyle = 'black';
				ct.strokeRect(transform.x, transform.y, this._bounds.width, this._bounds.height);
			}
			else if(this._isSelected)
			{
				ct.strokeStyle = 'gray';
				ct.strokeRect(transform.x, transform.y, this._bounds.width, this._bounds.height);
			}
				
		},
		
		_handleInputCurrent: function()
		{
			this.text += Input.getText().replace(/[\n\t\r]+/g, '');
			
			

			/*
			if(Input.key.isDown(Input.key.CONTROL) && Input.key.isPressed(Input.key.A))
			{
				// Remove the A.
				this.text = this.text.substr(0, this.text.length - 1);
			}
			*/
			
			if(Input.key.isPressed(Input.key.ENTER))
				this._submitCallback();
				
				
			
			if(this.text.length > 0 && Input.key.isPressed(Input.key.BACKSPACE))
			{
				if(Input.key.isDown(Input.key.CONTROL))
					this.text = '';
				else
					this.text = this.text.substr(0, this.text.length - 2);
			}
		},
		
		isSelectable: function()
		{
			return true;
		},
		
		activate: function()
		{
			this._isActivated = true;
            $('#field').trigger('focus');
		},
		
		deactivate: function()
		{
			this._isActivated = false;
            $('#field').trigger('blur');
		},
	});


	return GUITextField;
}();