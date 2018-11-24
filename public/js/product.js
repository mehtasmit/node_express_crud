function loadSubCategories(){
    var category_id=$('#category_id').val();
    $.ajax({
        url:base_url+'admin/get-sub-categories',
        type:'POST',
        dataType:'json',
        data:{'category_id':category_id},
        success:function(response){
            var _sub_cat_html='<option>Select Sub-Category</option>';
            if(response.status=="success"){
                console.log(response.sub_categories);
                $(response.sub_categories).each(function(i,sub_cat){
                    _sub_cat_html+='<option value="'+sub_cat.id+'">'+sub_cat.name+'</option>'
                });
                $('#sub_category_id').html('');
                $('#sub_category_id').append(_sub_cat_html);
            }
        }
    });
}

$(document).ready(function(){
   $('#product_list').DataTable();
});