fis-velocity-label-parser
=========================
fis velocity 标签分析

###介绍：分析velocity中的标签，返回标签对应的数组。

### 背景

velocity中很多标签均对应#end结尾，正则无法匹配出对应标签，使用fis-velocity-label-parser即可返回对应标签。方便其他编译使用。


### a.vm
```html
#html("home:static/lib/mod.js")
        #head
                <meta charset="utf-8"/>

                #if($info.imgs) 
                    <img src="$info.imgs" border=0> 
                #else 
                    <img src="noPhoto.jpg"> 
                #end
               
        #end

        #body
                #require("home:static/index/index.css")
                #widget("home:widget/A/A.tpl")

                ## 注释1

                #*
                    注释2
                *#

                #**
                    注释3
                *#
                
                #script
                        require.async("home:static/ui/B/B.js");
                #end

                #foreach( $info in $hotList1) 
                    <a href="/bbsdoc.ejf?easyJWebCommand=show&&cid=$!info.cid" target="_blank">$!info.title</a><br> 
                #end 

        #end

#end
```

###解析后结果为：
```bash
[ { start_label: '#if',
    end_label: '#end',
    start_index: 104,
    content_start_index: 107,
    content_end_index: 257,
    end_index: 258 },
  { start_label: '#head',
    end_label: '#end',
    start_index: 41,
    content_start_index: 46,
    content_end_index: 286,
    end_index: 287 },
  { start_label: '#script',
    end_label: '#end',
    start_index: 594,
    content_start_index: 601,
    content_end_index: 1013,
    end_index: 1014 },
  { start_label: '#style',
    end_label: '#end',
    start_index: 1036,
    content_start_index: 1042,
    content_end_index: 1275,
    end_index: 1276 },
  { start_label: '#if',
    end_label: '#end',
    start_index: 1298,
    content_start_index: 1301,
    content_end_index: 1442,
    end_index: 1443 },
  { start_label: '#foreach',
    end_label: '#end',
    start_index: 1466,
    content_start_index: 1474,
    content_end_index: 1629,
    end_index: 1630 },
  { start_label: '#body',
    end_label: '#end',
    start_index: 301,
    content_start_index: 306,
    content_end_index: 1644,
    end_index: 1645 },
  { start_label: '#html',
    end_label: '#end',
    start_index: 1,
    content_start_index: 6,
    content_end_index: 1650,
    end_index: 1651 } ]
    
```  
