import React, { useState } from "react";

const menuData = {
  เช้า: {
    ข้าว: [
      { name: "ข้าวต้มหมู", price: 40, img: "https://i.imgur.com/8cA5vDD.jpg" },
      { name: "ข้าวไข่เจียว", price: 35, img: "https://i.imgur.com/WpwLRmX.jpg" },
    ],
    เส้น: [
      { name: "ก๋วยเตี๋ยวต้มยำไม่เผ็ด", price: 50, img: "https://i.imgur.com/3IGKdGj.jpg" },
    ],
    "อะไรก็ได้": [
      { name: "แซนด์วิชไก่", price: 40, img: "https://i.imgur.com/tQp3wWe.jpg" },
    ],
    "ของว่าง/หวาน": [
      { name: "ขนมถ้วย", price: 20, img: "https://i.imgur.com/WKq0X7b.jpg" },
      { name: "ลอดช่อง", price: 25, img: "https://i.imgur.com/N8qT3Kr.jpg" },
    ],
    "7-11": [
      { name: "ซูชิ", price: 45, img: "https://i.imgur.com/kOAqks3.jpg" },
      { name: "ขนมปังไส้กรอก", price: 30, img: "https://i.imgur.com/x39b8vT.jpg" },
    ],
  },
  กลางวัน: {
    ข้าว: [
      { name: "ข้าวกะเพราไก่", price: 50, img: "https://i.imgur.com/0LF1QlH.jpg" },
      { name: "ข้าวมันไก่", price: 45, img: "https://i.imgur.com/YYfAt9V.jpg" },
    ],
    เส้น: [
      { name: "ผัดซีอิ๊ว", price: 50, img: "https://i.imgur.com/Toy4LpD.jpg" },
    ],
    "อะไรก็ได้": [
      { name: "ส้มตำไก่ย่าง", price: 60, img: "https://i.imgur.com/xeiIqcx.jpg" },
    ],
    "ของว่าง/หวาน": [
      { name: "โดนัท", price: 30, img: "https://i.imgur.com/kjAGv8Z.jpg" },
      { name: "ไอศกรีม", price: 35, img: "https://i.imgur.com/eu0dHdI.jpg" },
    ],
    "7-11": [
      { name: "ข้าวกล่อง", price: 55, img: "https://i.imgur.com/cMS09JQ.jpg" },
      { name: "บะหมี่กึ่งสำเร็จรูป", price: 20, img: "https://i.imgur.com/jgqY17B.jpg" },
    ],
  },
  เย็น: {
    ข้าว: [
      { name: "ข้าวขาหมู", price: 60, img: "https://i.imgur.com/EkQWq8u.jpg" },
      { name: "ข้าวหมูทอด", price: 55, img: "https://i.imgur.com/SwLPpYV.jpg" },
    ],
    เส้น: [
      { name: "ก๋วยเตี๋ยวน้ำตก", price: 55, img: "https://i.imgur.com/T4sxZvN.jpg" },
    ],
    "อะไรก็ได้": [
      { name: "หมูปิ้ง", price: 30, img: "https://i.imgur.com/Jr91zP3.jpg" },
    ],
    "ของว่าง/หวาน": [
      { name: "พายสับปะรด", price: 25, img: "https://i.imgur.com/JLUkQYy.jpg" },
      { name: "เยลลี่ผลไม้", price: 20, img: "https://i.imgur.com/yGOI9vY.jpg" },
    ],
    "7-11": [
      { name: "แซนวิชแฮมชีส", price: 40, img: "https://i.imgur.com/yXAnX3P.jpg" },
      { name: "ซาลาเปา", price: 25, img: "https://i.imgur.com/0cLs5q6.jpg" },
    ],
  },
};

export default function MenuRandomizer() {
  const [mealTime, setMealTime] = useState("");
  const [foodTypes, setFoodTypes] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [result, setResult] = useState("");

  const handleFoodTypeChange = (e) => {
    const value = e.target.value;
    setResult("");
    setSelectedMenus([]);
    setTotalPrice(0);

    if (e.target.checked) {
      setFoodTypes([...foodTypes, value]);
    } else {
      setFoodTypes(foodTypes.filter((type) => type !== value));
    }
  };

  const handleRandomize = () => {
    if (!mealTime) {
      setResult("กรุณาเลือกมื้ออาหาร");
      return;
    }
    if (foodTypes.length === 0) {
      setResult("กรุณาเลือกประเภทอาหารอย่างน้อยหนึ่งอย่าง");
      return;
    }

    let menusPicked = [];
    let priceSum = 0;

    foodTypes.forEach((type) => {
      const list = menuData[mealTime][type];
      if (list && list.length > 0) {
        const item = list[Math.floor(Math.random() * list.length)];
        menusPicked.push(item);
        priceSum += item.price;
      }
    });

    if (menusPicked.length === 0) {
      setResult("ไม่มีเมนูสำหรับตัวเลือกนี้");
      setSelectedMenus([]);
      setTotalPrice(0);
      return;
    }

    setSelectedMenus(menusPicked);
    setTotalPrice(priceSum);
    setResult("เมนูที่ได้:");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          maxWidth: "520px",
          width: "100%",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#333" }}>
          สุ่มเมนูอาหาร (ไม่เผ็ด ไม่ผัก) พร้อม 7-11
        </h2>

        <div style={{ marginBottom: "20px", fontSize: "18px" }}>
          <label>เลือกมื้ออาหาร: </label>
          <select
            value={mealTime}
            onChange={(e) => {
              setMealTime(e.target.value);
              setResult("");
              setSelectedMenus([]);
              setTotalPrice(0);
              setFoodTypes([]);
            }}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "8px",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <option value="">-- เลือกมื้อ --</option>
            {Object.keys(menuData).map((meal) => (
              <option key={meal} value={meal}>
                {meal}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            marginBottom: "20px",
            textAlign: "left",
            fontSize: "18px",
            maxWidth: "240px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <label style={{ marginBottom: "10px", display: "block" }}>
            เลือกประเภทอาหาร (เลือกได้หลายอย่าง):
          </label>
          {["ข้าว", "เส้น", "อะไรก็ได้", "ของว่าง/หวาน", "7-11"].map((type) => (
            <label
              key={type}
              style={{
                display: "block",
                cursor: "pointer",
                userSelect: "none",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#444",
              }}
            >
              <input
                type="checkbox"
                value={type}
                checked={foodTypes.includes(type)}
                onChange={handleFoodTypeChange}
                style={{ marginRight: "8px" }}
              />
              {type}
            </label>
          ))}
        </div>

        <button
          onClick={handleRandomize}
          style={{
            padding: "12px 30px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "600",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
        >
          สุ่มเมนู
        </button>

        {result && (
          <div style={{ marginTop: "30px", fontWeight: "bold", width: "100%" }}>
            <div style={{ fontSize: "20px", color: "#333" }}>{result}</div>
            <ul
              style={{
                listStyleType: "none",
                padding: 0,
                marginTop: "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {selectedMenus.map((menu, i) => (
                <li
                  key={i}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "10px",
                    width: "140px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    textAlign: "center",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={menu.img}
                    alt={menu.name}
                    style={{
                      width: "120px",
                      height: "90px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                  <div style={{ fontWeight: "600", color: "#222" }}>{menu.name}</div>
                  <div style={{ color: "#666", marginTop: "4px" }}>{menu.price} บาท</div>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: "25px",
                fontSize: "20px",
                fontWeight: "700",
                color: "#2e7d32",
              }}
            >
              ราคารวม: {totalPrice} บาท
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
