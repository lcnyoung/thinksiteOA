$(function(){
    
    //database 
    var datas = [
    	{
    		id: 3,
    		grade: "第一学期",
    		title: "HTML",
    		class: "146期",
    		status: "已发布",
    		creattime: "2016-11-03",
    		creater: "三日",
    		area: "南京",
    	},
    	{
    		id: 5,
    		grade: "第一学期",
    		title: "HTML",
    		class: "146期",
    		status: "已发布",
    		creattime: "2016-11-03",
    		creater: "三日",
    		area: "南京",
    	},
    	{
    		id: 6,
    		grade: "第一学期",
    		title: "HTML",
    		class: "146期",
    		status: "已发布",
    		creattime: "2016-11-03",
    		creater: "三日",
    		area: "南京",
    	},
        {
    		id: 7,
    		grade: "第一学期",
    		title: "HTML",
    		class: "146期",
    		status: "已发布",
    		creattime: "2016-11-03",
    		creater: "三日",
    		area: "南京",
    	},
        {
    		id: 9,
    		grade: "第一学期",
    		title: "HTML",
    		class: "146期",
    		status: "已发布",
    		creattime: "2016-11-03",
    		creater: "三日",
    		area: "南京",
    	}
    ]
    function initHtml(json){
        var page =
            '<tr>'
                +'<td class="id">'+'<input type="checkbox">'+json.id+'</td>'
                +'<td>'+'<input type="text" class="inp" value='+json.grade+' disabled>'+'</td>'
                +'<td>'+'<input type="text" class="inp" value='+json.title+' disabled>'+'</td>'
                +'<td>'+'<input type="text" class="inp" value='+json.class+' disabled>'+'</td>'
                +'<td>'+'<input type="text" class="inp" value='+json.status+' disabled>'+'</td>'
                +'<td>'+'<input type="text" class="inp" value='+json.creattime+' disabled>'+'</td>'
                +'<td>'+'<input type="text" class="inp" value='+json.creater+' disabled>'+'</td>'
                +'<td>'+'<input type="text" class="inp" value='+json.area+' disabled>'+'</td>'
                +'<td>'+'<input type="button" class="x" value="删除" title="'+json.id+'"></td>'+
            '</tr>' ;
        return page;
    }
    
    
    //init page
    function initPage(data){
        $("tbody").html("");
        $.each(data,function(key,val){
            $("tbody").append(initHtml(val));
        })
    }
    
    initPage(datas);
    
    //deleta data
    
    $("body").on("click",".x",function(){
        var id = parseInt($(this).attr("title"));
        for(var i = 0;i < datas.length; i++){
            if(id == datas[i].id){
                datas.splice(i,1);
                $(this).parent("td").parent("tr").remove()
            } 
            
        }
    })
    
    //add data
    var id_ = null;
    $.each(datas,function(key,val){
        if(id_　< val.id){
            id_ = val.id;
        }
    })
    
    function refreshHtml(data,class_){
        data.unshift({
            id: class_.id,
            grade: $(class_.grade).val(),
            title: $(class_.title).val(),
            class: $(class_.class).val(),
            status: $(class_.status).val(),
            creattime: $(class_.creattime).val(),
            creater: $(class_.creater).val(),
            area: $(class_.area).val(),
        })
        
        $(".adddata input[type='text']").val("");
        
        initPage(data)
    }
    
    $(".btn").on("click",function(){
        if($(".grade").val()=="" || $(".title").val()=="" || $(".class").val()=="" || $(".status").val()=="" || $(".time").val()==""|| $(".creater").val()=="" || $(".area").val()==""){  //check whether input all 
            $(".warn").html("存在未填写项,请仔细检查,确保所有信息录入完成,再次点击提交")
        } else{
            id_ = id_ + 1;
            refreshHtml(datas,{id:id_,grade: '.grade',title: '.title',class: '.class',status: '.status',creattime: '.time',creater: '.creater',area: '.area'})
            $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg")
            $(".warn").html("")
        }
    })
    
    
    
    
    
    //list change
    
    function order(data,status,fun){
        if(status){
            var emp = null;
            for(var i = 0;i < data.length;i++){
                for(var j = i + 1;j < data.length;j++){
                    if(data[i].id > data[j].id){
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp
                    }
                }
            }
        } else{
            for(var i =0;i < data.length;i++){
                for(var j = i + 1;j < data.length;j++){
                    if(data[i].id < data[j].id){
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp
                    }
                }
            }
        };
        fun();
    }
    
    //Arrow Switching
    $(".arrow").on("click",function(){
        if($(this).hasClass("h")){
            $(this).html("&#xe604;");
            order(datas,true,function(){
                initPage(datas)
            })
            $(this).removeClass("h");
            $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg")
        } else{
            $(this).html("&#xe611;");
            order(datas,false,function(){
                initPage(datas)
            })
            $(this).addClass("h");
            $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg")
        }
    });
   
    //keyboard 
    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg")
    $(window).keydown(function(e){
        var key = e.keyCode
        var ind = $("tbody tr.bg").index() 
        switch(key){
            case 38:
                if(ind > 0){
                    ind --;
                    $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg")
                }
                break;
            case 40:
                if(ind < $("tbody tr").length - 1){
                    ind ++;
                    $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg")
                }
                break;
            case 46:
                $("tbody tr.bg").remove();
                if(ind <= $("tbody tr").length - 1){
                    $("tbody tr").eq(ind).addClass("bg")
                } else{
                    ind = ind - 1
                    $("tbody tr").eq(ind).addClass("bg")
                }          
                break;
        }
    })
    
    //click to change the data 
    $(window).on("click","td",function(){
        $(this).children(".inp").removeAttr("disabled")
    })
            
    $(window).on("blur","td",function(){
        $(this).children(".inp").attr("disabled",true)
    })
    
    //selcet all
    var sta = 0
    $("#selall").on("click",function(){
        if(sta == 0){
            $("td input[type='checkbox']").attr("checked",true);
            sta = 1;
        } else{
            $("td input[type='checkbox']").removeAttr("checked");
            sta = 0;
        }   
    })
    
    
})