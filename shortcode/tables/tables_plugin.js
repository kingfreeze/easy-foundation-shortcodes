(function() {
    tinymce.create('tinymce.plugins.oscitasEFSTables', {
        init : function(ed, url) {
            ed.addButton('oscitasefstables', {
                title : 'Table Shortcode',
                image : url+'/icon.png',
                onclick : function() {
                    create_oscitas_efs_table();
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Table Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefstables', tinymce.plugins.oscitasEFSTables);
})();

function create_oscitas_efs_table(){
    if(jQuery('#oscitas-form-table').length){
        jQuery('#oscitas-form-table').remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form ='<div id="oscitas-form-table"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-table-width">Table Width</label></th>\
				<td><input type="text" name="icontag" id="oscitas-table-width" value="100%" /><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-table-columns">Columns</label></th>\
				<td><input type="text" name="link" id="oscitas-table-columns" value="4" /><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-table-rows">Rows</label></th>\
				<td><input type="text" name="title" id="oscitas-table-rows" value="4" /><br />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-table-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-table-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-submit" class="button-primary" value="Insert Table" name="submit" />\
		</p>\
		</div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        model:true,
        height:'auto',
        width:600,
        title:'Table Shortcode',
        open:function(){
            var content=jQuery(this);
            var table = content.find('table');

            // handles the click event of the submit button
            content.find('#oscitas-submit').click(function(){
                // defines the options and their default values
                // again, this is not the most elegant way to do this
                // but well, this gets the job done nonetheless
                var cusclass='';
                if(table.find('#oscitas-table-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-table-class').val()+'"';
                }
                var columns = table.find('#oscitas-table-columns').val();
                var rows = table.find('#oscitas-table-rows').val();
                var value = table.find('#oscitas-table-width').val();
                //var osStyle = table.find('#oscitas-table-style').val();

                //var osHover = table.find('#oscitas-table-hover').prop('checked') ? ' table-hover' : '' ;
                //var osScroll = table.find('#oscitas-table-scroll').prop('checked')? 'true': 'false';
                //creating table
                var shortcode = '[efstable ';
                shortcode += 'width ="' + value + '"';
                //shortcode += ' style ="' + osStyle +osHover+ '"';
                //shortcode += ' responsive ="' +osScroll+ '"'+cusclass;

                shortcode += ']<br/>[efstable_head]<br/>';
                for (var i=1;i<=columns;i++)
                {
                    shortcode += '[efsth_column]Heading-'+i+'[/efsth_column]<br/>';
                }
                shortcode += '[/efstable_head]<br/>[efstable_body]<br/>';

                for (var j=1;j<=rows;j++)
                {
                    shortcode += '[efstable_row]<br/>';
                    for (var i=1;i<=columns;i++)
                    {
                        shortcode += '[efsrow_column]value-'+i+'[/efsrow_column]<br/>';
                    }

                    shortcode += '[/efstable_row]<br/>';
                }
                shortcode += '[/efstable_body]<br/>[/efstable]';


                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

                // closes fancybox
                content.dialog( "destroy" );
            });
        }
    });
}
