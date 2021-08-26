            

    
        //写経 上部ドラッグ＆ドロップエリア    
        
        var fileArea = document.getElementById('dragDropArea');
            var fileInput = document.getElementById('fileInput');
            fileArea.addEventListener('dragover', function(evt){
            evt.preventDefault();
            fileArea.classList.add('dragover');
            });


            fileArea.addEventListener('dragleave', function(evt){
                evt.preventDefault();
                fileArea.classList.remove('dragover');
            });


            fileArea.addEventListener('drop', function(evt){
                evt.preventDefault();
                fileArea.classList.remove('dragenter');
                var files = evt.dataTransfer.files;
                console.log("DRAG & DROP");
                console.table(files);
                fileInput.files = files;
                photoPreview('onChenge',files[0]);
            });


            function photoPreview(event, f = null) {
            var file = f;
            if(file === null){
                file = event.target.files[0];
            }
            var reader = new FileReader();
            var preview = document.getElementById("previewArea");
            var previewImage = document.getElementById("previewImage");

            if(previewImage != null) {
                preview.removeChild(previewImage);
            }
            reader.onload = function(event) {
                var img = document.createElement("img");
                img.setAttribute("src", reader.result);
                img.setAttribute("id", "previewImage");
                preview.appendChild(img);
            };

            reader.readAsDataURL(file);
            }


            // 画像保存準備
            $("#save").on("click",function(){       

                const day = $("#date").val();
                const key = $("#title").val();

                const memo = $("#memo").val();
                const gazo =$("#previewImage").attr("src");

                console.log(key);
                console.log(day);
                console.log(memo);
                console.log(gazo);

            // バリューを配列化
                const value = {
                    value_1:day ,
                    value_2:memo ,
                    value_3:gazo

                };

            // ローカルストレージにセット

                localStorage.setItem(key,JSON.stringify(value));

            // ページ下部にセット
                const html =`
                <li>
                <div id="hyouji" class="${key}">
                    <img src= ${gazo} id=gazo2>
                    <a href="https://www.google.com/search?q=${key}" id="p1">${key}</a>
                    <p id="p2">${day}</p>
                    <p id="p3">${memo}</p>
                    <div>
                        <input type = "checkbox" id="check" class="${day}" name="check01" data-clearkey="${key}">
                        
                    </div>
                </div>
                </li>` ;

            // htmlに書き出し
                $("#listsyousai").append(html);

            // 書いた後に記載を消す
                $("#key").val("");
                $("#title").val("");
                $("#memo").val("");
                $("#previewImage").attr("src" , "");


            });


        //  保存データ取得と表示// 配列のバリューの中身を抜いてつける
        for(let i = 0; i< localStorage.length; i++){
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));
        
            console.log(key);
            console.log(value.value_1);
            console.log(value.value_2);
            console.log(value.value_3);

            let key2 = key ;
            let day2 = value.value_1 ;
            let memo2 = value.value_2 ;
            let g2 = value.value_3 ;

            console.log(key2);
            console.log(day2);
            console.log(memo2)


            const html =`
            <li>
            <div id="hyouji" class="${key2}">
                <img src= ${g2} id=gazo2>
                <a href="https://www.google.com/search?q=${key2}" id="p1" class="p1">${key2}</a>
                <p id="p2">${day2}</p>
                <p id="p3">${memo2}</p>
                <div>
                    <input type = "checkbox" id="check" class="${day2}" name="check01" data-clearkey="${key2}">
                    
                </div>
            </div>
            </li>` ;

        // htmlに書き出し
            $("#listsyousai").append(html);
        
        }


            // チェックボックスついてるものだけ消す
            $(document).on("click", ".clear", function () {

			const elements = document.getElementsByName("check01");
			var arr = new Array();


			for (let i = 0; i < elements.length; i++) {
				
				//チェックついているものだけ処理
				if (elements[i].checked) {
					const clearkey = elements[i].dataset.clearkey;
					localStorage.removeItem(clearkey);
					console.log(clearkey);
					
					//チェックついてたものを配列に格納
					arr.push(clearkey);
				}

				
				//チェックついてたものを非表示
				for (let i = 0; i < arr.length; ++i) {
					$('.' + arr[i]).css("display", "none");
				}
				
				//配列を空に
				var arr = [];

			}

	});

