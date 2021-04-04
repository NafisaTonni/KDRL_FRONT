function examCalenderBuild(data){
	

	examCalenderGrid.setRowData(data);
	
	examCalenderGrid.build(()=>({
		delete:{msg: {
				type:"delete_exam_calendar",
				data:{
					inst_id: inst_id,
					exam_calendar_id:examCalenderGrid.getSelectedRows()[0].exam_calendar_id
				}
			} ,
			key: 'exam_calendar_list'
				},
		edit:{
			tab:{ /*-- if you dont want to use modal --*/
				tabId: '',
				position: 3
				},
			callback: function(){
				console.log(delGrid.edit);
				//your code here
				}
			},
		view:{
			id:"#modal-exam-calendar-view",
			callback: ()=>{
				new UtileWidget().regularGrid("#exam-subject", [{
					headerName: "SL#",
					width: 10,
					valueGetter: 'node.id'
				},
				{
					headerName: "Subject",
					field: "subject_name"
				},{
					headerName: "Subject Id",
					field: 'subject_id',
					hide: true
				},{
					headerName: "Date",
					field: "date",
			}]
				);
		}
	}
    }));
}
