angular.module('app', ['ui.bootstrap'])

.controller('mainController', ['$scope','$document','$element', '$http', '$compile', function($scope, $document, $element, $http, $compile) 
		{
		$scope.items = [];
			$scope.formData= {};
			$scope.user = {name: 'guest', last: 'visitor'};
        $scope.getFormItems = function() {
			var myNode = document.getElementById("form");
			myNode.innerHTML = '';
			$element.find('form').empty();
         $http({method : 'GET',url : 'https:randomform.herokuapp.com/'})
            .success(function(data, status) {
			     $scope.items = data.data.form_fields;
			for(i=0;i<$scope.items.length;i++){
			 //textinput element
			  if($scope.items[i].component == 'textinput'){		
				  var divElement = document.createElement("div");
				  divElement.setAttribute('class', "form-group");
				
				  var labelElement = document.createElement("label");
				  labelElement.setAttribute('for', "exampleInput");
				  labelElement.innerHTML =$scope.items[i].label;
				  divElement.appendChild(labelElement);			
			     var element1 = document.createElement("input");
				  if($scope.items[i].autofill !== undefined){ 
				  $scope.formData[i] = $scope.items[i].autofill;
				  }
				     element1.setAttribute('type', 'text');
					 element1.setAttribute('ng-model', 'formData['+i+']');
					 element1.setAttribute('class', "form-control");
					  element1.setAttribute('style', "border: 1px solid #dddddd");
				
				 if($scope.items[i].editable === false){ 
				 element1.setAttribute('readonly', '' );
				 }
				 if($scope.items[i].required === true){ 
				 element1.setAttribute('required', '' );
				  }

					 divElement.appendChild(element1);
					  document.getElementById("form").appendChild(divElement);
                 }
				
				 //Textarea element
				 if($scope.items[i].component == 'textarea'){		
				 var divElement = document.createElement("div");
				 divElement.setAttribute('class', "form-group");
				
				 var labelElement = document.createElement("label");
				 labelElement.setAttribute('for', "exampleInput");
				 labelElement.innerHTML =$scope.items[i].label;
				 divElement.appendChild(labelElement);			
			     var element1 = document.createElement("textarea");
				 if($scope.items[i].autofill !== undefined){ 
				     $scope.formData[i] = $scope.items[i].autofill;
				  }
				
					  element1.setAttribute('ng-model', 'formData['+i+']');
					  element1.setAttribute('class', "form-control");
					  element1.setAttribute('style', "border: 1px solid #dddddd");
				
				  if($scope.items[i].editable === false){ 
				  element1.setAttribute('readonly', '' );
				  }
				  if($scope.items[i].required === true){ 
				  element1.setAttribute('required', '' );
				  }

					  divElement.appendChild(element1);
					  document.getElementById("form").appendChild(divElement);
                 }
					 $compile(document.getElementById("form"))($scope);
			
			 //radio element
				if($scope.items[i].component == 'radio'){		
				var divElement = document.createElement("div");
				divElement.setAttribute('class', "form-group");
				
				var labelElement = document.createElement("label");
				labelElement.setAttribute('for', "exampleInput");
				labelElement.innerHTML =$scope.items[i].label;
				divElement.appendChild(labelElement);
				
				if ($scope.items[i].options !==undefined) {
				$scope.arrlength = $scope.items[i].options.length;
				}
				for(j=0;j<$scope.arrlength;j++){
				var divElement1 = document.createElement("div");
				divElement1.setAttribute('class', "radio radio-info radio-inline");
				divElement.appendChild(divElement1);
							
			     var element1 = document.createElement("input");
				 if ($scope.items[i].autoselect !==undefined) {
	 			 if($scope.items[i].autoselect == $scope.items[i].options[j]){ 
						 $scope.formData[i] = $scope.items[i].autoselect;
						}
					 }
					element1.setAttribute('type', 'radio');
					element1.setAttribute('ng-model', 'formData['+i+']');
					element1.setAttribute('name', 'formData['+i+']');
					element1.setAttribute('value', $scope.items[i].options[j]);
					element1.setAttribute('id', 'inlineRadio['+i+']');

				if($scope.items[i].editable === false){ 
				  element1.setAttribute('disabled', 'true' );
				  }
				  if($scope.items[i].required === true){ 
				  element1.setAttribute('required', '' );
				  }
				
				 divElement1.appendChild(element1);
					
				 var labelElement1 = document.createElement("label");
				 labelElement1.setAttribute('for', 'inlineRadio['+i+']');
				 labelElement1.innerHTML =$scope.items[i].options[j];
				 divElement1.appendChild(labelElement1);
				
				 
                 }
				 document.getElementById("form").appendChild(divElement);
				 }
				
				   //Checkbox element
				   if($scope.items[i].component == 'checkbox'){		
				var divElement = document.createElement("div");
				divElement.setAttribute('class', "form-group");
				
				var labelElement = document.createElement("label");
				labelElement.setAttribute('for', "exampleInput");
				labelElement.innerHTML =$scope.items[i].label;
				divElement.appendChild(labelElement);
				
				if ($scope.items[i].options !==undefined) {
				$scope.chklength = $scope.items[i].options.length;
				
				for(k=0;k<$scope.chklength;k++){
				var divElement1 = document.createElement("div");
				divElement1.setAttribute('class', "checkbox checkbox-info checkbox-inline");
							
			     var element1 = document.createElement("input");
				 $scope.formData[i] ={};
				 if ($scope.items[i].autoselect !==undefined) {
	 				$scope.chkautolength = $scope.items[i].autoselect.length;
					for(o=0;o<$scope.chkautolength;o++){ 

	 			 if($scope.items[i].autoselect[o] == $scope.items[i].options[k]){ 
						 $scope.formData[i][k] = true;
						}
					 if($scope.items[i].autoselect[o] != $scope.items[i].options[k]){ 
						 $scope.formData[i][k] = false;
						}
					}	
					 }else{
							$scope.formData[i][k] = false;
						}
					element1.setAttribute('type', 'checkbox');
					element1.setAttribute('ng-model', 'formData['+i+']['+k+']');
					element1.setAttribute('name', 'formData['+i+']['+k+']');
					element1.setAttribute('value', $scope.formData[i][k]);
					element1.setAttribute('id', 'inlineCheckbox['+i+']['+k+']');

				if($scope.items[i].editable === false){ 
				  element1.setAttribute('disabled', 'true' );
				  }
				  if($scope.items[i].required === true){ 
				  element1.setAttribute('required', '' );
				  }
				
				 divElement1.appendChild(element1);
					
				 var labelElement1 = document.createElement("label");
				 labelElement1.setAttribute('for', 'inlineCheckbox['+i+']['+k+']');
				 labelElement1.innerHTML =$scope.items[i].options[k];
				 divElement1.appendChild(labelElement1);
				divElement.appendChild(divElement1);
				 }
				
				
				}
				
                 				

				 document.getElementById("form").appendChild(divElement);
				 }
				
				
				 //select element
				 if($scope.items[i].component == 'select'){		
				 var divElement = document.createElement("div");
				 divElement.setAttribute('class', "form-group");
				
				 var labelElement = document.createElement("label");
				 labelElement.setAttribute('for', 'exampleSelect['+i+']');
				 labelElement.innerHTML =$scope.items[i].label;
				 divElement.appendChild(labelElement);
				
				 var selectElement = document.createElement("select");
				 selectElement.setAttribute('class', "form-control");
				 selectElement.setAttribute('id', 'exampleSelect['+i+']');
				 selectElement.setAttribute('ng-model', 'formData['+i+']');
				 if($scope.items[i].editable === false){ 
				 selectElement.setAttribute('disabled', 'true' );
				 }
				  if($scope.items[i].required === true){ 
				  selectElement.setAttribute('required', '' );
				 }
				  if ($scope.items[i].options !==undefined) {
				 $scope.sellength = $scope.items[i].options.length;
					  for(l=0;l<$scope.sellength;l++){
						   if ($scope.items[i].autoselect !==undefined) {
	 				 if($scope.items[i].autoselect == $scope.items[i].options[l]){ 
						 $scope.formData[i] = $scope.items[i].options[l];
					 }
					 }else{
						 $scope.formData[i] = $scope.items[i].options[0];
					 }
						  
    			  var element1 = document.createElement("option");
				 element1.innerHTML =$scope.items[i].options[l];
			     element1.setAttribute('value', $scope.items[i].options[l]);

				  selectElement.append(element1);
				  }
				  }
				
				 divElement.appendChild(selectElement);
			
				 document.getElementById("form").appendChild(divElement);
                
				 }
				
					$compile(document.getElementById("form"))($scope);
			
			 
							
			
             }
			 $element.find('form').append('<div class="clear"></div><input type="submit" class="btn btn-primary" value="Submit Form">');

			 })
			     

            .error(function(data, status) {
                alert("Error");
            })
        }
		
		 $scope.submitForm = function() {
		//alert($scope.formData);
		
		//$scope.formData = {};
            //$http.post('https:randomform.herokuapp.com/submit', data);
			};

		}]
		
		
);
   // .directive('selectPicker', function ($timeout) {
     // return {
         // link: function (scope, element, attr) {
             // var last = attr.last;
             // if (last === "true") {
                 // $timeout(function () {
                     // $(element).parent().selectpicker('val', 'any');
                     // $(element).parent().selectpicker('refresh');
                 // });
             // }
         // }
     // };

 // });
  
