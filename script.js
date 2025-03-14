let selectedIdentity = "";
let selectedService = "";

function resetButtons(group) {
    document.querySelectorAll(group).forEach(btn => btn.classList.remove("selected"));
}

// 身份選擇
document.getElementById("btn-veteran").addEventListener("click", function () {
    resetButtons(".btn-group .btn");
    this.classList.add("selected");
    selectedIdentity = "veteran";

    document.getElementById("veteranOptions").classList.remove("hidden");
    document.getElementById("familyOptions").classList.add("hidden");
    document.getElementById("conditions").classList.add("hidden");
});

document.getElementById("btn-family").addEventListener("click", function () {
    resetButtons(".btn-group .btn");
    this.classList.add("selected");
    selectedIdentity = "family";

    document.getElementById("familyOptions").classList.remove("hidden");
    document.getElementById("veteranOptions").classList.add("hidden");
    document.getElementById("conditions").classList.add("hidden");
});

// 服務選擇（榮民）
document.querySelectorAll(".veteran-service").forEach(button => {
    button.addEventListener("click", function () {
        resetButtons(".veteran-service");
        this.classList.add("selected");
        selectedService = this.getAttribute("data-value");
        showConditions(selectedService);
    });
});

// 服務選擇（榮眷）
document.querySelectorAll(".family-service").forEach(button => {
    button.addEventListener("click", function () {
        resetButtons(".family-service");
        this.classList.add("selected");
        selectedService = this.getAttribute("data-value");
        showConditions(selectedService);
    });
});

function showConditions(service) {
    const conditionsDiv = document.getElementById("conditions");
    const conditionsList = document.getElementById("conditions-list");
  const messageContainer = document.getElementById("success-message");
  
    if(messageContainer){
      messageContainer.innerHTML = "";
      messageContainer.style.display = "none";
    }

    conditionsList.innerHTML = ""; // 清空條件

    const conditions = {
        "identity": ["志願服現役滿10年以上", "於79年2月9日前入營服志願役軍（士）官","於94年8月9日前入營之志願役士兵","因作戰或因公致病、傷或身心障礙而失去工作能力","曾參加民國47年八二三臺海保衛戰役之軍士官兵（含金門馬祖民防自衛隊）"],
        "school": ["就讀國內具有正式學籍之大專校院及研究所", "出國就讀研究所攻讀碩、博士", "為使經濟弱勢之退除役官兵再就學者", "具中低(低)收入戶資格", "校級以下退除役官兵", "參加國內大專校院推廣教育、學分班、空中大學（專校）函授班", "參加政府立案補習班補習，且實際報名參加考試院辦理之國家考試及國(公)營事業機構進用考試"],
        "work": ["退除役官兵參加全日制職業訓練班隊", "結訓次日起4個月內就業", "退除役官兵失業期間連續達1個月以上或屬非自願離職、經輔導會推介就業", "於服役期滿次日起1個月內之新退官兵、經輔導會推介就業", "連續就業滿3個月以上"],
        "care": ["榮民服役期間因戰(公)傷殘、且無固定職業", "榮民年滿61歲", "無固定職業", "全戶所得低於一定標準", "未公費就養之榮民", "榮民之無固定職業之父母及配偶"],
        "medical": ["榮民因為生活輔助需要，符合申請資格", "有診斷證明"],
        "service_care": ["榮民之30歲以下子女，就讀高中職以下學校符合申請資格者", "榮民之30歲以下子女，就讀大學及研究所符合申請資格者"],
        "service_lunch": ["就讀國中、國小之榮民或榮民遺眷子女", "符合低收入戶、中低收入戶","因家庭突發因素無力支付午餐費","或經學校認定清寒無力支付午餐費，並納入午餐補助","有特殊事由經本會評估核認者等條件者"],
        "retire_money": ["支領退休俸、贍養金或生活補助費", "中校階(含)以下人員", "子女在臺灣地區居住，就讀政府立案之公(私)立大專以下，小學以上學校肄業正式生", "領俸人亡故，遺族可請領改支", "依法退伍支領退休俸、贍養金或生活補助費人員", "在臺灣地區設有戶籍之父母、配偶及子女(未成年或未婚成年就讀大學或未婚(含離婚)身心障礙者)", "持有備除役軍人眷屬證", "支領軍職退休俸、贍養金及生活補助費之退除役官兵本人", "領有備除役軍人眷屬證之眷屬（配偶、父母、未成年之未婚子女、就讀國內大學以下學校之已成年未婚子女或持有身心障礙證明文件之未婚(含已離婚)子女）"],
        "fam_identity": ["亡故榮民之配偶，且未再婚者", "亡故榮民之直系血親尊親屬", "亡故榮民之未滿 20 歲未婚子女或未滿 25 歲且就讀國內大學（含）以下學校之未婚子女", "亡故榮民之持有中度以上身心障礙證明之未婚子女", "戰訓或因公殞命軍人之遺族", "領有義士證者之遺眷"],
        "fam_funeral": ["條件 丙", "條件 丁"],
        "fam_cru_assist": ["就養榮民亡故，其無職業現居住於臺灣地區之配偶或直系血親"],
        "fam_emer_assist": ["遭受意外傷害致生活陷於困境者", "罹患重病、其他原因無法工作致生活陷入困境者"]
    };

    if (conditions[service]) {
        conditionsDiv.classList.remove("hidden");
        conditions[service].forEach((condition, index) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `condition${index}`;
            checkbox.name = `condition${index}`;

            const label = document.createElement("label");
            label.htmlFor = `condition${index}`;
            label.textContent = condition;

            const div = document.createElement("div");
            div.appendChild(checkbox);
            div.appendChild(label);
          
            if(service === "service_lunch" && index > 0){
              div.style.display = "none";
            }
            if(service === "care" && (index === 2 || index ===3)){
              div.style.display = "none";
            }
            if(service === "school" && (index === 5 || index === 6)){
              div.style.display = "none";
            }
          
            conditionsList.appendChild(div);
          
            // 為每個 Checkbox 加上事件監聽器
            checkbox.addEventListener("change", checkConditions);
        });
      if (service === "service_lunch") {    document.getElementById("condition0").addEventListener("change", () => toggleOtherOptions(service));
        }
      if (service === "care") {       document.getElementById("condition1").addEventListener("change", () => toggleOtherOptions(service));
        }
      if (service === "school") {       document.getElementById("condition4").addEventListener("change", () => toggleOtherOptions(service));
        }

        checkConditions(); // 初始化檢查資格
    } else {
        conditionsDiv.classList.add("hidden");
    }
  
    // checkbox.id = `condition${index}`;
}

function toggleOtherOptions(service_choose) {
    // console.log(service_choose)
    if(service_choose === "service_lunch"){
      const firstCheckbox = document.getElementById("condition0");
      const otherCheckboxes = document.querySelectorAll("#conditions-list input[type='checkbox']:not(#condition0)");

      otherCheckboxes.forEach(checkbox => {
          const parentDiv = checkbox.parentElement;
          if (firstCheckbox.checked) {
              parentDiv.style.display = "block"; // 顯示其他條件
          } else {
              parentDiv.style.display = "none";  // 隱藏其他條件，且取消勾選
              checkbox.checked = false;
          }
      });}
    
      if(service_choose === "care"){
        const condition1 = document.getElementById("condition1");
        const condition2 = document.getElementById("condition2").parentElement;
        const condition3 = document.getElementById("condition3").parentElement;
        
        const condition2_c = document.getElementById("condition2");
        const condition3_c = document.getElementById("condition3");
        
        if(condition1.checked){
          condition2.style.display = "block";
          condition3.style.display = "block";
        }
        else{
          condition2.style.display = "none";
          condition3.style.display = "none";
          condition2_c.checked = false;
          condition3_c.checked = false;
        }
    }
  
      if(service_choose === "school"){
        const condition1 = document.getElementById("condition4");
        const condition2 = document.getElementById("condition5").parentElement;
        const condition3 = document.getElementById("condition6").parentElement;
        
        if(condition1.checked){
          condition2.style.display = "block";
          condition3.style.display = "block";
        }
        else{
          condition2.style.display = "none";
          condition3.style.display = "none";
        }
    }

    checkConditions(); // 檢查是否符合資格
}

function checkConditions() {
    let messageContainer = document.getElementById("success-message");

    // 如果 message 容器不存在，就創建一個
    if (!messageContainer) {
        messageContainer = document.createElement("div");
        messageContainer.id = "success-message";
        messageContainer.classList.add("content-box");
        document.querySelector(".container").appendChild(messageContainer);
    }

    messageContainer.innerHTML = ""; // 先清空內容

    let hasMessage = false;
    const checkboxes = document.querySelectorAll("#conditions-list input[type='checkbox']");

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            let messageText = "";

            // 根據不同的 selectedService 顯示不同的訊息
            if (selectedService === "identity") {
                messageText = messages.identity[checkbox.id] || "";
            } else if (selectedService === "service_care") {
                messageText = messages.service_care[checkbox.id] || "";
            } 
          
            if (messageText) {
                const message = document.createElement("p");
                message.innerHTML = messageText.replace(/\n/g, "<br>"); // 換行處理
                messageContainer.appendChild(message);
                hasMessage = true;
            }
        }
    });
  
    let service = selectedService; // 取得當前選擇的服務類型
  
    // **service_lunch 需要特殊判斷**
    if (service === "service_lunch") {
      const firstCheckbox = document.getElementById("condition0"); // 第一個條件
      const otherCheckboxes = document.querySelectorAll("#conditions-list input[type='checkbox']:not(#condition0)");

      let otherChecked = Array.from(otherCheckboxes).some(checkbox => checkbox.checked); // 是否有勾選其他條件

      if (firstCheckbox.checked && otherChecked) {
          const message = document.createElement("p");
          message.innerHTML = `恭喜！你符合午餐補助申請資格！<br><strong>得申請例假日及寒暑假午餐補助金，每日以80元計</strong>`;
          messageContainer.appendChild(message);
          hasMessage = true;
      }
    }
  
    if (service === "care") {
      const condition0 = document.getElementById("condition0");
      const condition1 = document.getElementById("condition1");
      const condition2 = document.getElementById("condition2");
      const condition3 = document.getElementById("condition3");
      const condition4 = document.getElementById("condition4");
      const condition5 = document.getElementById("condition5");
      
      if((condition1.checked && (condition2.checked && condition3.checked)) || (condition0.checked)){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你符合<strong>公費就養</strong>申請資格！<br><strong>每月可領取就養給付1萬4,874元，並得依意願公費進住榮家</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      else if(condition4.checked || condition5.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你符合<strong>自費就養</strong>申請資格！<br><strong>得自付服務費(安養每月6,000元，養護每月6,800元)，至榮家安養或養護。</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
    }
  
    if (service === "medical") {
      const condition0 = document.getElementById("condition0");
      const condition1 = document.getElementById("condition1");
    
      if(condition0.checked && condition1.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你符合<strong>輔具輔助</strong>申請資格！<br><strong>可就近向本會各縣市榮民服務處或榮譽國民之家申請<br>輪椅、助聽器、眼鏡、義眼．．．等輔具及鑲牙的補助</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
    }
  
    if(service === "work"){
      const condition0 = document.getElementById("condition0");
      const condition1 = document.getElementById("condition1");
      const condition2 = document.getElementById("condition2");
      const condition3 = document.getElementById("condition3");
      const condition4 = document.getElementById("condition4");
      
      if(condition0.checked && condition1.checked && condition4.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你得<strong>發給訓後就業穩定津貼</strong>！<br><strong>榮民前半年每月1萬2千元，後半年每月8千元；第二類退除役官兵前半年每月6千元，後半年每月4千元。</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      
      if((condition2.checked || condition3.checked) && condition4.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你得<strong>發給推介就業穩定津貼</strong>！<br><strong>榮民每月8千元；第二類退除役官兵每月4千元。 </strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
    }
  
    if(service === "school"){
      const condition0 = document.getElementById("condition0");
      const condition1 = document.getElementById("condition1");
      const condition2 = document.getElementById("condition2");
      const condition3 = document.getElementById("condition3");
      const condition4 = document.getElementById("condition4");
      const condition5 = document.getElementById("condition5");
      const condition6 = document.getElementById("condition6");
      
      if(condition0.checked || condition1.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你獲得<strong>就學補助生活津貼及獎勵</strong>！<br><strong>提供學雜費補助每學期20,000~80,000元/每學期；成績優異獎勵擇優每學期10,000元(名額400人)。</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      
      if(condition2.checked && condition3.checked){
        const message = document.createElement("p");
        message.innerHTML = `於就學期間<strong>減輕其經濟壓力</strong>！<br><strong>就學期間按月核發就學生活津貼5,900元。俾以認真向學，充實專業知能，提升就業競爭力，以順利就業。</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      
      if(condition5.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你獲得<strong>大專校院進修補助</strong>！<br><strong>每人補助總金額以12萬元為上限，加強輔助對象補助總金額以16萬元為上限，以補助12次為限，每年限申請3次。</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      
      if(condition6.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你獲得<strong>就業考試進修補助</strong>！<br><strong>補助總金額以5萬元為上限。補助次數以4次為限，每年限申請1次。</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
    }
  
    if(service === "retire_money"){
      const [condition0, condition1, condition2, condition3, condition4, condition5, condition6, condition7, condition8] = [0,1,2,3,4,5,6,7,8].map(i => document.getElementById(`condition${i}`));
      
      if(condition0.checked && condition1.checked && condition2.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你得申請<strong>子女教育補助費</strong>！`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      
      if(condition3.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你可請領改支下列給付：<br><strong>一、遺屬年金：</strong><br>遺族為配偶、父母、未成年子女或已成年因重度身心障礙而無工作能力之子女可改
支遺屬年金。<br><strong>二、遺屬一次金：</strong><br>不符申請遺屬年金之遺族，僅能依優先順序共同領受一次金。`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      
      if(condition4.checked && condition5.checked && condition6.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你可享有<strong>用水、用電優待(僅限申辦一戶)、各榮民總(分)院、軍醫院及門診中心就醫優待(部份掛號費優惠)及國軍英雄館住宿優待</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
      
      if(condition7.checked || condition8.checked){
        const message = document.createElement("p");
        message.innerHTML = `恭喜！你獲得<strong>水電優待</strong>！<br><strong>可擇一個供水（電）戶優待。</strong>`;
        messageContainer.appendChild(message);
        hasMessage = true;
      }
    }

    // 如果沒有選任何條件，隱藏 message 容器
    messageContainer.style.display = hasMessage ? "block" : "none";
}

const identity_message = "恭喜！您符合申請榮民證的資格！<br>請檢附以下文件：<strong><br>1.身分證<br>2.最近三個月內一吋脫帽半身照<br>3.申請表（可至本會官網下載列印或由榮服處提供）<br>4.委託代辦者：申請人附委託書、受委託人身分證正本</strong>";

const messages = {
    "identity": {
        "condition0": identity_message,
        "condition1": identity_message,
        "condition2": identity_message,
        "condition3": identity_message,
        "condition4": identity_message
    },
    "service_care":{
        "condition0": "恭喜！您符合申請就學補助<br><strong>1.就讀五專前三年、高中、高職每學期補助3,800元<br>2.就讀國中、國小每學期補助500元</strong>",
        "condition1":  "恭喜！您符合申請就學補助<br><strong>每學期補助金為公立大學8,000元、私立大學1萬元</strong>"
    }
};
