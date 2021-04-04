$.widget.bridge('uibutton', $.ui.button);



/*Constant Value*/
const inst_id = 1;
const  DATE_FORMAT =  'YYYY-MM-DD';
const  DATE_TIME_FORMAT =  'MM/DD/YYYY hh:mm A';
const  MOBILE_NUMBER_FORMAT = {"mask": "(999) 99-999999"};
const  NUMBER_FORMAT = {};
const PHOTO_SIZE = {height: 140, width: 140};

/*Constant Value*/


//var URL = 'http://localhost:8087/tlp/restservice_post.html';
//var URL = 'http://192.168.2.232:8080/tlp_services/restservice_post.html';
//const URL = 'http://192.168.2.232:8080/tlp_services/restservice_post.html';

class UtilWidget{
	
	constructor(){
		this.options={
			url:URL
		};
		
		this.Toast = Swal.mixin({
		      toast: true,
		      position: 'top-end',
		      showConfirmButton: false,
		      timer: 3000
		    });

		if(!!UtilWidget.singleton){
			return UtilWidget.singleton;
		}

		UtilWidget.singleton = this;

		return this;
	}

	static get URL(){
		return new UtilWidget().options.url;
	}

	getError(msg="Error: @required arg"){
		throw new Error(msg);
	}
	
	http(data = this.getError()){
		return new Promise(function (resolve, reject) {
				$.ajax({
					url : UtilWidget.URL,
					contentType : 'application/json',
					type : 'post',
					data: JSON.stringify(data),
					success : function(data, textStatus, jQxhr) {
						
							//console.log(JSON.parse(data.replace(/@#/g, ':')));
							 resolve(JSON.parse(data.replace(/@#/g, ':')), textStatus, jQxhr);
						
					},
					error : function(jqXhr, textStatus, errorThrown) {
						 reject(jqXhr, textStatus, errorThrown);
					}
					
				});
		});
	}
	
	state(data = this.getError(), show=false){
		let Toast = this.Toast;
		return new Promise((resolve, reject)=> {switch (data.tag) {
				
				case 'success':
					show && Toast.fire({
				        type: 'success',
				        title: data.msg||'Success!!!'
				      });
					resolve(data);
					break;
				case 'error':
					show && Toast.fire({
				        type: 'error',
				        title: data.msg || 'Fail!!!'
				      });
					reject(data.data);
					break;	
		
				default:
					show && Toast.fire({
				        type: 'error',
				        title: data.msg || 'Fail!!!'
				      });
					reject(this.getError(data));
					break;
		};
		});
	}

	
	regularGrid(id = this.getError(), colDefinition=[]){
		colDefinition.forEach(d=> d.sortable = true);
		let div = document.querySelector(id);
		
		div.childNodes[0] !== undefined && div.removeChild(div.childNodes[0]);
		
		var gridOptions ={
				rowSelection: 'single',
				enableBrowserTooltips: true,
				columnDefs: colDefinition,
				onGridReady: function(params) {
					params.api.sizeColumnsToFit();
					$('#nav-button').click(function(){
						console.log('clicked');
						setTimeout(function(){
							params.api.sizeColumnsToFit();
						},300)
					});
				}
				};
		
		
		new agGrid.Grid(div, gridOptions);
		
		// gridOptions.api.sizeColumnsToFit();
		
		gridOptions.api.getAllRows=()=>{
			let allRows =[];
			gridOptions.api.forEachNode(d=> allRows.push(d.data));
			return allRows;
		};
//		gridOptions.api.setRowData(data);
		return gridOptions.api;
	}

	deletableGrid(id = this.getError(), colDefinition=[], options={filter: false, delete: true, edit: true, view: false}){//filter = false, deletableOnly = false, view = false){
		
		colDefinition.forEach(d=> {d.sortable = true; d.filter = true});
		
		let PRODUCTS_ACTIONS_TEMPLATE = `<div class="products-actions">
		${options.view ? `<a class="view fa fa-info-circle action-icon" title="View Details" style="color: var(--primary);text-align: center;padding: 0px 10px;"
				aria-hidden="true">
				</a>`:""}
			
		${options.edit ? `<a class="edit fa fa-pencil-alt action-icon" title="Edit" style="color: var(--success);text-align: center;padding: 0px 10px;"
			aria-hidden="true">
			</a>`:""}
		${options.delete ? `
				<a class="remove fa fa-times action-icon" title="Delete" style="color: var(--danger); text-align: center;padding: 0px 10px;"
			aria-hidden="true">
			</a>`:""}
			</div>`;

		let div = document.querySelector(id);
		
		div.childNodes[0] !== undefined && div.removeChild(div.childNodes[0]);

		colDefinition.push({
			headerName: "Action",
			field: 'delete',
			template: PRODUCTS_ACTIONS_TEMPLATE,
			minWidth: options.view? 120:80,
			maxWidth: options.view? 120:80,
			filter: false
		   /* pinned: 'right'*/
		  });


		let gridOptions = {
			columnDefs: colDefinition,
			onGridReady: function(params) {
				params.api.sizeColumnsToFit();
				$('#nav-button').click(function(){
					console.log('clicked');
					setTimeout(function(){
						params.api.sizeColumnsToFit();
					},400)
				});
			},
			defaultColDef: {
				sortable: true,
				filter: true,
				resizable: true
			},
			rowSelection:'single',
			floatingFilter:options.filter
			//onSelectionChanged: onSelectionChanged
		};


		new agGrid.Grid(div, gridOptions);
		
		gridOptions.api.sizeColumnsToFit();
//		gridOptions.api.setRowData(data);

		gridOptions.api.onDelete = (callback)=>{
			setTimeout(function(){ 
				var selected = gridOptions.api.getSelectedRows();			
				console.log(selected);
				console.log(new UtilWidget());
				new UtilWidget()._repeater(callback(selected).delete, gridOptions.api, callback);
				//new UtilWidget().http(callback(selected)||{}).then(msg=> new UtilWidget().state(msg, true));
			}, 100);
		}
		
		
		gridOptions.api.getAllRows=()=>{
			let allRows =[];
			gridOptions.api.forEachNode(d=> allRows.push(d.data));
			return allRows;
		};
		
		gridOptions.api.build=(callback)=>{
			
			if(options.delete){
				document.querySelectorAll(id+" .remove").forEach(dom=>{ 
					// console.log(callback);
					dom.addEventListener('click', function(){
						bootbox.confirm({
							
							title: "Confirmation",
							message: "Are You Sure? You want to delete.",
//							className:"modal-dialog-centered",
							buttons: {
								confirm: {
									label: 'Yes',
									className: 'btn-success btn-cus'
								},
								cancel: {
									label: 'No',
									className: 'btn-danger btn-cus'
								}
							},
							callback: function (result) {
								result && gridOptions.api.onDelete(callback);
							}
						})
					});
				});
			}
			

			if(options.edit){
				document.querySelectorAll(id+" .edit").forEach(dom=>{ 
					dom.addEventListener('click', function(){
						setTimeout(function(){ 
							var selected = gridOptions.api.getSelectedRows();
							let msg = callback(selected);
							
							gridOptions.api.edit = gridOptions.api.getSelectedRows();
							
							try {
								if (typeof msg.edit.tab !== "undefined"){
									
//									$(msg.edit.tab.tabId).tabs( "enable", +msg.edit.tab.position);
									$(msg.edit.tab.tabId).tabs("option", "active", +msg.edit.tab.position);
									console.log("I am here");
									msg.edit.callback();
									console.log("I am here2");
								}
							} catch (e) {
								
								console.log(e)
							}
							
							try {
								if(typeof msg.edit.id !== "undefined"){
									$(msg.edit.id +" .prefix").html("Edit");
									$(msg.edit.id).modal();
									$(msg.edit.id).modal('show');
									msg.edit.callback();
								}
							} catch (e) {
								console.log("Modal Undefined")
							}
							
							
						
						
					});
				},100)
				})
			}
			
			if(options.view){
				document.querySelectorAll(id+" .view").forEach(dom=>{
					
					dom.addEventListener('click', function(){
						setTimeout(function(){ 
							var selected = gridOptions.api.getSelectedRows();
							let msg = callback(selected);
						gridOptions.api.view = gridOptions.api.getSelectedRows();
						if(typeof msg.view.id !== "undefined"){
							
							$(msg.view.id).modal();
							$(msg.view.id).modal('show');
							msg.view.callback(selected);
						}
					});
				},100)
				})
			}


		}
		

		return gridOptions.api;
	}

	dropDown(options){

		var that = this;
		var dom = $(options.id);

		dom.find('option').remove();

		dom.append('<option disabled selected  value=' + 0 + '>'
		+ '--Select ' + '</option>'+ options.data.map((d)=>{ 
			let key = Object.keys(d);
//			console.log(key);
			return key[0].split("_").pop()=="id" ?
					`<option value= ${d[key[0]] }> ${key[1].split("_").pop().trim()=="native"?d[key[2]]: d[key[1]]} </option>`:
						key[1].split("_").pop()=="id" ?`<option value= ${ d[key[1]] }> ${ key[0].split("_").pop().trim()=="native"?d[key[2]]:d[key[0]] } </option>`:
							`<option value= ${ d[key[2]] }> ${ key[0].split("_").pop().trim()=="native"?d[key[1]]:d[key[0]] } </option>`})
			.join(""));
		
		dom.off().on("change",function(){
			if(options.onChange !== undefined)
				 that.dropDown(options.onChange);
			else
				options.callback();
		});
	}
}



function sibling(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8){
        return true;
    }else if(event.keyCode === 46){
    	return false;
    }else if ( key < 48 || key > 57 ){
        return false;
    }else if (event.target.textLength>14){
        return false;
    }else {
    	return true;
    }
};


function monthlyIncome(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8||event.keyCode === 46){
        return true;
    }else if ( key < 48 || key > 57 ){
        return false;
    }else if (event.target.textLength>5){
        return false;
    }else {
    	return true;
    }
};
function nidcheck(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8||event.keyCode === 46){
        return true;
    }else if ( key < 48 || key > 57 ){
        return false;
    }else if (event.target.textLength>16){
        return false;
    }else {
    	return true;
    }
};

function numberOnly(event) { 
	    var key = window.event ? event.keyCode : event.which;
	    if (event.keyCode === 8){
	        return true;
	    }else if(event.keyCode === 46){
	    	return false;
	    }else if ( key < 48 || key > 57 ){
	        return false;
	    }else {
	    	return true;
	    }
	
}; 

function alertMsg(msg){
	bootbox.dialog({
			message: `<h6>${msg}</h6>`,
		    size: 'small',
		    closeButton: false,
		    buttons: {
		        "success": {
		           label: "Ok", 
		           className: "btn-primary btn-cus",
		           callback: function () {}
		        }
		    }       
		});
}

