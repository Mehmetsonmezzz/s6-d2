/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
import React, { useState } from "react";
import Gonderiler from "./bilesenler/Gonderiler/Gonderiler";
import AramaCubugu from "./bilesenler/AramaCubugu/AramaCubugu";
// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import sahteVeri from "./sahte-veri.js";
import "./App.css";

const App = () => {
  const [gonderiler, setGonderiler] = useState(sahteVeri);
  //setGonderiler = sahteVeri;
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.
  const [aramaKriteri, setAramaKriteri] = useState("");
  const gonderiyiBegen = (gonderiID) => {
    console.log("Esmeralda beni beğendi! Esmeralda beni beğendi!", gonderiID);

    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */

    const updatedGonderiler = gonderiler.map((g) => {
      if (g.id === gonderiID) {
        g.likes += 1;
        return g;
      }

      return g;
    });

    setGonderiler(updatedGonderiler);
  };

  const aramaHandler = (val) => {
    setAramaKriteri(val);
    if (val === "") {
      // BU yasak gonderiler = sahteVeri;
      setGonderiler(sahteVeri);
    } else {
      console.log("test filte arama test may day may day");
      const filtered = sahteVeri.filter((g) => g.username.includes(val));
      // BU yasak gonderiler = filtered;
      setGonderiler(filtered);
    }
  };

  const test = (g) => {
    const filtered = gonderiler.filter((g) =>
      g.username.includes(aramaKriteri)
    );
    setGonderiler(filtered);
  };

  return (
    <div className="App">
      {/* Yukarıdaki metni projeye başladığınızda silin*/}
      {/* AramaÇubuğu ve Gönderiler'i render etmesi için buraya ekleyin */}
      <AramaCubugu aramaKriteri={aramaKriteri} aramaHandler={aramaHandler} />
      {/* Her bileşenin hangi proplara ihtiyaç duyduğunu kontrol edin, eğer ihtiyaç varsa ekleyin! */}
      <Gonderiler
        gonderilerProp={gonderiler}
        gonderiyiBegenFnProp={gonderiyiBegen}
      />
    </div>
  );
};

export default App;
