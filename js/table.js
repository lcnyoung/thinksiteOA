$(function(){
    
    //database   数据库
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
                +'<td class="id" title="'+json.id+'">'+'<input type="checkbox"><span>'+json.id+'</span></td>'
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
    
    
    //init page   渲染页面
    function initPage(data){
        $("tbody").html("");
        $.each(data,function(key,val){
            $("tbody").append(initHtml(val));
        })
    }
    
    initPage(datas);
    
    //deleta data   点击删除按钮
    
    $("body").on("click",".x",function(){
        var id = parseInt($(this).attr("title"));
        for(var i = 0;i < datas.length; i++){
            if(id == datas[i].id){
                datas.splice(i,1);
                $(this).parent("td").parent("tr").remove()
            } 
            
        }
    })
    
    //add data     插入数据
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
    
    
    
    
    
    //list change    排序切换
    
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
    
    //Arrow Switching    排序箭头上下切换
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
   
    //keyboard     键盘操作
    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg")
    $(window).keydown(function(e){
        var key = e.keyCode
        var ind = $("tbody tr.bg").index() 
        switch(key){
            case 38: // up  上
                if(ind > 0){
                    ind --;
                    $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg")
                }
                break;
            case 40:  //down  下
                if(ind < $("tbody tr").length - 1){
                    ind ++;
                    $("tbody tr").eq(ind).addClass("bg").siblings("tr").removeClass("bg")
                }
                break;
            case 46:  //delete   删除
                var id = $("tbody tr.bg").children(".id").attr("title");
                for(var i = 0;i < datas.length; i++){
                    if(id == datas[i].id){
                        datas.splice(i,1);
                    } 
                }
                $("tbody tr.bg").remove();
                
                if(ind <= $("tbody tr").length - 1){
                    $("tbody tr").eq(ind).addClass("bg")
                } else{
                    ind = ind - 1
                    $("tbody tr").eq(ind).addClass("bg")
                }          
                break;
            case 13:   //enter  回车
                ind = $("tbody tr.bg").index()
                if($("tbody tr").eq(ind).children(".id").children("input").is(":checked")){
                    $("tbody tr").eq(ind).children(".id").children("input").attr("checked",false)
                } else{
                    $("tbody tr").eq(ind).children(".id").children("input").attr("checked",true)
                };
                break;
                
        }
    })
    
    //click to change the data   点击表格元素变为可编辑
    $(window).on("click","td",function(){
        $(this).children(".inp").removeAttr("disabled")
    })
            
    $(window).on("blur","td",function(){
        $(this).children(".inp").attr("disabled",true)
    })
    
    
    
    
    var sta = 0  
    var checked = [];
    
    //click to push selected data to checked   点击选中行,并将选中行的id数据暂存至checked数组
    $("td input[type='checkbox']").on("click",function(){
        var id = parseInt($(this).siblings("span").text());
        
        if($(this).hasClass("cked")){
            $.each(checked,function(key,val){
                if(val == id){
                    checked.splice(key,1)
                }
            })
            $("#selall").removeAttr("checked").removeClass("cked");
            $(this).removeClass("cked");
        } else{
            checked.push(id);
            $(this).addClass("cked");
            if(checked.length == $("tbody tr").length){
                $("#selall").attr("checked",true).addClass("cked");
            }
        }
    })
    //select all     点击全选
    $("#selall").on("click",function(){
        if($(this).hasClass("cked")){
            $("td input[type='checkbox']").removeClass("cked").removeAttr("checked");
            $(this).removeClass("cked");
            sta = 0;
        } else{
            $("td input[type='checkbox']").addClass("cked").attr("checked",true);
            $(this).addClass("cked");
            sta = 1;
        }   
    })
    //select to delete     点击删除选中行
    $(".del").on("click",function(){
        if(sta == 1){
            $("tbody").html("");
            datas = [];
        } else{
            $("td input:checked").each(function(){
                var id = $(this).parent("td").attr("title");
                for(var i = 0;i < datas.length; i++){
                    if(id == datas[i].id){
                        datas.splice(i,1)
                    }
                }
            })
            $("td input[type='checkbox']:checked").parent().parent().remove()
        }
    })
})