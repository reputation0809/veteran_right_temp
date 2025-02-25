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

    conditionsList.innerHTML = ""; // 清空條件

    const conditions = {
        "identity": ["志願服現役滿10年以上", "於79年2月9日前入營服志願役軍（士）官","於94年8月9日前入營之志願役士兵","因作戰或因公致病、傷或身心障礙而失去工作能力","曾參加民國47年八二三臺海保衛戰役之軍士官兵（含金門馬祖民防自衛隊）"],
        "school": ["退伍軍人報考高中以上學校", "二專、二技、四技／大學推甄入學", ""],
        "work": ["條件 A", "條件 B"],
        "care": ["榮民服役期間因戰(公)傷殘、且無固定職業", "榮民年滿61歲且無固定職業，且全戶所得低於一定標準"],
        "medical": ["無職業榮民", "有職業榮民"],
        "service_care": ["榮民之30歲以下子女，就讀高中職以下學校符合申請資格者", "榮民之30歲以下子女，就讀大學及研究所符合申請資格者"],
        "retire_money": ["條件 M", "條件 N"],
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
            conditionsList.appendChild(div);
          
            // 為每個 Checkbox 加上事件監聽器
            checkbox.addEventListener("change", checkConditions);
        });
    } else {
        conditionsDiv.classList.add("hidden");
    }
  
    // checkbox.id = `condition${index}`;
}

function checkConditions() {
    const checkboxes = document.querySelectorAll("#conditions-list input[type='checkbox']");
    const messageContainer = document.getElementById("success-message");

    // 如果 message 容器不存在，就創建一個
    if (!messageContainer) {
        const newMessage = document.createElement("div");
        newMessage.id = "success-message";
        newMessage.classList.add("content-box");
        document.querySelector(".container").appendChild(newMessage);
    } else {
        messageContainer.innerHTML = ""; // 先清空
    }

    // 檢查每個 checkbox 的勾選狀態
    checkboxes.forEach(checkbox => {
        if (checkbox.checked && messages[checkbox.id]) {
            // 如果有對應的訊息，就顯示
            const message = document.createElement("p");
            message.innerHTML = messages[checkbox.id];
            messageContainer.appendChild(message);
        }
    });

    // 如果都沒有選，則隱藏訊息容器
    if (messageContainer.innerHTML === "") {
        messageContainer.style.display = "none";
    } else {
        messageContainer.style.display = "block";
    }
}

const messages = {
    "condition0": [
        "恭喜！你符合申請榮民證的資格！",
        "請檢附以下文件：",
        "<strong>- 身分證</strong>",
        "<strong>- 最近三個月內一吋脫帽半身照</strong>",
        "<strong>- 申請表</strong>"
    ].join("<br>"),
    "condition1": "你可以申請B補助，快去看看！",
    "condition2": "符合條件C，請準備相關文件。",
    "condition3": "符合條件D，可以申請特別優惠。"
};
