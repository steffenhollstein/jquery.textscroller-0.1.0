/*!
* jQuery Plugin "Text Scroller" v0.1.0 <http://code.google.com/p/jquery-textscroller/> 
* @requires jQuery v1.9.0 or later 
* is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
(function($){
	
	
	/*
		Example / Vertical:
		--------------------------------------------------------
		<div class="jquery-textscroller">
			BEGIN: obex per Hereditas tot Ver peto ait Emiror effluo incrementabiliter Manipulus basilicus cur repletus duo Industria ira via. Heu fas gelidus. Is ius Multi rex. Seu pax. Succumbo laxe improvidus Succendo pax ne dum eo. Eia. Devotio moderamen Gemblacensis Opportune sui improbitas peto upilio Castanea ivi Vindex per tui Marcieniensis Inhalo dux Devio res prodigiosus non ita Celeritas, deduco aut adhuc lactans lentus allatus. In moratlis For paciscor arx Crimen se arx Reduco Protendo neo Ejulo una Paulisper hio pro canistrum pax Illae evado ibi Exorbatus qui. Qui semoveo Tubineus mancipo nam Desposco reddo intemporaliter Sufficio, cum aut pax se Erro, diu Ingressus qui Honestas roto vos hos vix Distinguo humus dignor. Cui leno ex suspicor Amor quibus res occido Consido oro noster lauvabrum sed Inquam haec eia Cumulus, ius lux Castrum ver Fatuo ymo res for Animus laxe Novem nec Teneo. Ego macto re stupeo Labor sus, ver ex aut exhorto sis aliter foetidus expono. Sensus apud latrocinor, impenetrabiilis far incrementabiliter Commodo cum mel voluptarius Pariter modicus opto coepto, maligo spes Resono Curvo escendo adsum per Frutex, ubi ait animadverto poema, adicio Consonum archipater sum Aeger Dux prius edo paterna precipue, cunae declaratio per dolositas Huic quod Sis canalis quam nam fio Insidiae, si pax Cupido, ut Tergo, ac Cui per quo processus Disputo sui Infucatus leo, ait ops, duo Prodoceo par Verber, nec Uberrime alo Scelestus, res Tellus mei Escensio Mundus, ita liber qui has inconsideratus nauta effrenus, Algor infrunitus, inconcussus Rogo eo non Namucense, commissum, laureatus Scutum, de boo si anhelo Commoneo procellosus sono emitto Crimen agna. Si subo Accubo castimonia hic ibi qua lux sto eu Pulcher Sem. Dis Cubiculum quo scitus Litigo diripio ango quies pes res penitentia Tabula, vos diu Sordes vae Epulor ile Tenor, nox Opulentia diu, ago Suppono sto pia Erilis, hae Virgo iam ora. Nam constat Lues huic eia qua vox ara proh ille se Ymber clango. Sive furca P. END
		</div>
		<script type="text/javascript">
			jQuery(document).ready(function(){
				
				jQuery(
					".jquery-textscroller"
				).textscroller({
					width : 200,
					height : 300
				});
				
			});
		</script>
	*/
	
	
	// Default options
	var defaults = {
		
		// selectors
		selectorWrapperOuther : '.jquery-textscroller-wrapper-outher',
		selectorWrapper : '.jquery-textscroller-wrapper',
		selectorButtonPrev : '.jquery-textscroller-button-prev',
		selectorButtonNext : '.jquery-textscroller-button-next',
		
		addCustomClass : 'default',
		
		// settings
		vertical : true,
		width : '100%',
		height : 'auto',
		
		containerOuther : '<div class="jquery-textscroller-wrapper-outher"><div class="jquery-textscroller-wrapper"></div></div>',
		containerButtons : '<div class="jquery-textscroller-button-prev"><!-- - --></div><div class="jquery-textscroller-button-next"><!-- - --></div>',
		
		innerTextButtonPrev : '',
		innerTextButtonNext : '',
		
		callbackBeforeInit : function(){},
		callbackAfterInit : function(){},
		
		touchableDevice : 'ontouchstart' in window,
		
		debug : false,
		debugOuputMessagePrefix : 'jQuery Textscroller : '
	};
	
	
	var methods = {
		
		
		/********** init - BEGIN **********/
		init : function( globaloptions ) {
			
			
			var currentTextScrollerObj = this;
			
			
			if( currentTextScrollerObj.length > 0 )
			{
				
				// merge the plugin defaults with custom options
				var globaloptions = jQuery.extend({}, defaults, globaloptions);
				
				
				globaloptions.callbackBeforeInit();
				
				
				currentTextScrollerObj.each(function(){
					
					preparerVertical(
						jQuery(
							this
						)
					);
					
				});
			
			} else {
				
				methods.debugOutput({ 
					msg : 'No Scroller Object found'
				});
			}
			
			
			function preparerVertical(contentObj)
			{
				var wrapperObj = contentObj.wrap(
					globaloptions.containerOuther
				).parent(
					globaloptions.selectorWrapper
				);
				
				var wrapperOutherObj = contentObj.parent().parent(
					globaloptions.selectorWrapperOuther
				);
				
				
				if( globaloptions.addCustomClass )
				{
					wrapperOutherObj.addClass(
						globaloptions.addCustomClass
					).addClass(
						globaloptions.vertical ? "vertical" : "horizontal"
					);
				}
				
				
				wrapperOutherObj.width(
					globaloptions.width
				).prepend(
					globaloptions.containerButtons
				);
				
				wrapperObj.width(
					globaloptions.width
				).height(
					globaloptions.vertical ? globaloptions.height : 'auto'
				);
				
				
				
				// horizontal
				if( !globaloptions.vertical )
				{
					var helperContainerObj = jQuery(
						'<div class="jquery-textscroller-helper-container"></div>'
					);
					
					var helperContainerWidth = Math.abs(
						wrapperObj.width() * 1000 / globaloptions.height
					);
					
					helperContainerObj.html(
						contentObj.html()
					).css({
						display : 'block',
						width : helperContainerWidth + 'px'
					});
					
					contentObj.width(
						helperContainerObj.width()
					);
					
					helperContainerObj.remove();
					
				}
				
				var wrapperObjWidth = wrapperObj.width();
				var contentObjWidth = contentObj.width();
				
				var maxScrollValueLeft = parseInt(
					contentObjWidth - wrapperObjWidth
				);
				
				
				
				// vertical
				var wrapperObjHeight = wrapperObj.height();
				var contentObjHeight = contentObj.height();
				
				var maxScrollValueTop = parseInt(
					contentObjHeight - wrapperObjHeight
				);
				
				var buttonsObj = wrapperOutherObj.find(
					globaloptions.selectorButtonPrev + ', ' + globaloptions.selectorButtonNext
				);
				
				
				wrapperOutherObj.find(
					globaloptions.selectorButtonPrev
				).text(
					globaloptions.innerTextButtonPrev
				);
				
				
				wrapperOutherObj.find(
					globaloptions.selectorButtonNext
				).text(
					globaloptions.innerTextButtonNext
				);
				
				
				if( 
					(
						globaloptions.vertical && contentObjHeight > wrapperObjHeight
					) || (
						!globaloptions.vertical && contentObjWidth > wrapperObjWidth
					)
				){
					// init click events
					wrapperOutherObj.find(
						globaloptions.selectorButtonPrev
					).addClass(
						'inactive'
					);
					
					
					// init click events
					buttonsObj.off(
						"click touchstart touchmove touchend"
					).on("click touchstart touchmove touchend", function(event){
						
						var thisObj = jQuery(
							this
						);
						
						if( !globaloptions.touchableDevice && event.type == 'click' )
						{
							initNavigate(
								thisObj
							);
						} 
						else if( event.type == 'touchstart' )
						{
							initNavigate(
								thisObj
							);
						}
						
					});
					
					
					function initNavigate(thisObj)
					{
						if( globaloptions.vertical )
						{
							naviPreparer({
								wrapperObj : wrapperOutherObj,
								buttonObj : thisObj,
								obj : contentObj,
								type : (
									thisObj.is(globaloptions.selectorButtonPrev) ? 'prev' : 'next'
								),
								maxScrollValueStart : maxScrollValueTop - (maxScrollValueTop * 2),
								marginValueToScroll : wrapperObjHeight
							});
							
						} else {
							
							naviPreparer({
								wrapperObj : wrapperOutherObj,
								buttonObj : thisObj,
								obj : contentObj,
								type : (
									thisObj.is(globaloptions.selectorButtonPrev) ? 'prev' : 'next'
								),
								maxScrollValueStart : maxScrollValueLeft - (maxScrollValueLeft * 2),
								marginValueToScroll : wrapperObjWidth
							});
						}
					}
					
				
				} else {
					
					buttonsObj.addClass(
						'disabled'
					);
					
				}
				
				
				globaloptions.callbackAfterInit();
				
				
			}
			
			
			function naviPreparer(settings)
			{
				var settings = jQuery.extend({
					wrapperObj : null,
					buttonObj : null,
					obj : null,
					type : 'prev',
					maxScrollValueStart : 0,
					maxScrollValueEnd : 0,
					marginValueToScroll : 333,
					scrollingAllowed : false
				}, settings || {} );
				
				
				// merge the plugin defaults with custom options
				settings = jQuery.extend({}, defaults, settings);
				
				
				var marginType = (
					globaloptions.vertical ? 'margin-top' : 'margin-left'
				);
				
				var scrollOperator = (
					settings.type == 'next' ? '-=' : '+='
				);
				
				var getCurrentScrollPosition = parseInt(
					settings.obj.css(
						marginType
					).replace(
						'px',
						''
					)
				);
				
				
				if( settings.type == 'next' )
				{
					settings.scrollingAllowed = (
						settings.maxScrollValueStart <= (
							getCurrentScrollPosition - settings.marginValueToScroll
						)
					);
					
					if( !settings.scrollingAllowed )
					{
						settings.marginValueToScroll = (
							settings.maxScrollValueStart - getCurrentScrollPosition
						);
						
						settings.scrollingAllowed = (
							settings.maxScrollValueStart <= (
								settings.marginValueToScroll + getCurrentScrollPosition
							)
						);
						
						settings.marginValueToScroll = parseInt(
							settings.marginValueToScroll.toString().replace(
								'-',
								''
							)
						);
					}
					
				} else {
					
					settings.scrollingAllowed = (
						settings.maxScrollValueEnd >= (
							getCurrentScrollPosition + settings.marginValueToScroll
						)
					);
					
					if( !settings.scrollingAllowed )
					{
						settings.marginValueToScroll = (
							settings.maxScrollValueEnd + getCurrentScrollPosition
						);
						
						settings.scrollingAllowed = (
							settings.maxScrollValueEnd <= (
								settings.marginValueToScroll - getCurrentScrollPosition
							)
						);
						
						settings.marginValueToScroll = parseInt(
							settings.marginValueToScroll.toString().replace(
								'-',
								''
							)
						);
					}
					
				}
				
				
				if( settings.scrollingAllowed )
				{
					if( globaloptions.vertical )
					{
						settings.obj.stop().animate({
							easing  : 'swing',
							marginTop : scrollOperator + settings.marginValueToScroll + 'px'
						}, "slow", function(){
							
							startAnimation();
							
						});
						
					} else {
						
						settings.obj.stop().animate({
							easing  : 'swing',
							marginLeft : scrollOperator + settings.marginValueToScroll + 'px'
						}, "slow", function(){
							
							startAnimation();
							
						});
					}
				}
				
				
				function startAnimation()
				{
					var getCurrentScrollPosition = parseInt(
						settings.obj.css(
							marginType
						).replace(
							'px',
							''
						)
					);
					
					var statusTop = settings.maxScrollValueStart == getCurrentScrollPosition;
					var statusBottom = settings.maxScrollValueEnd == getCurrentScrollPosition;
					
					var statusClassTop = (
						statusTop ? 'inactive' : ''
					);
					
					var statusClassBottom = (
						statusBottom ? 'inactive' : ''
					);
					
					var wrapperObjStatusClass = (
						statusClassTop == "" && statusClassBottom == "" ? "prev-next-active" : ""
					);
					
					statusClass = (
						statusClassTop != '' ? statusClassTop : (
							statusClassBottom != '' ? statusClassBottom : ''
						)
					);
					
					settings.wrapperObj.removeClass(
						"prev-next-active"
					).addClass(
						wrapperObjStatusClass
					).find(
						globaloptions.selectorButtonPrev + ', ' + globaloptions.selectorButtonNext
					).removeClass(
						'inactive'
					);
					
					settings.buttonObj.addClass(
						statusClass
					);
				}
			}
			
			
		},
		/********** init - END **********/
		
		
		
		
		/************ debugOutput - BEGIN ************/
		debugOutput : function(settings){
			
			/*
				Example:
				-----------------------
				<script type="text/javascript">
					method.debugOutput({ 
						msg : 'test' 
					});
				</script>
			*/
			
			//default settings
			var settings = jQuery.extend({
				msg : null
			}, settings || {} );
			
			
			// merge the plugin defaults with custom options
			settings = jQuery.extend( {}, defaults, settings );
			
			
			if( !window.console )
			{
				window.console = {
					log : function(){},
					debug : function(){},
					error : function(){},
					warn : function(){}
				};
			}
			
			
			if( settings.debug && settings.msg )
			{
				
				if( typeof(settings.msg) == "object" ){
					
					console.info( 
						settings.msg
					);
					
				} else {
					
					if( settings.msg.trim() != '' ){
						
						console.log( 
							settings.debugOuputMessagePrefix + settings.msg
						);
						
					} else {
						
						console.log( 
							settings.msg
						);
					}
					
				}
				
			}
		}
		/************ debugOutput - END ************/
		
		
		
	};
	
	
	jQuery.fn.textscroller = function( method ){
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			jQuery.error( 'Method ' +	method + ' does not exist on jQuery.textscroller' );
		}		
	};
	
	
})(jQuery);