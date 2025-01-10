const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        {
            breakpoint: 1024, // Tablet and above
            settings: {
                slidesToShow: 3, // Show 3 slides at a time
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 768, // Small screens (mobile)
            settings: {
                slidesToShow: 2, // Show 2 slides at a time
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480, // Very small screens
            settings: {
                slidesToShow: 1, // Show 1 slide at a time
                slidesToScroll: 1,
            },
        },
    ],
};



export const SERVER = 'https://morax-shop-backend.onrender.com'



const brands  = [
    {
      name: "Nike",
      imgUrl: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/05856ac7-0129-4395-bd6e-2fe2669025fb/custom-nike-dunk-low-by-you-su24.png"
    },
    {
      name: "Apple",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAd9gPzKBvVmxRqaF6bMWugfD228SLehtUBw&s"
    },
    {
      name: "Samsung",
      imgUrl:`https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/256_144_2.png?$512_N_PNG$`
    },
    {
      name: "Adidas",
      imgUrl: "https://cdn.freebiesupply.com/logos/large/2x/adidas-logo.png"
    },
    {
      name: "Sony",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrU2kGCh-wC0BZbhi2cO8wwHE3KHACtIJZfg&s"
    },
    {
      name: "Gucci",
      imgUrl:"https://static.toiimg.com/thumb/imgsize-23456,msid-106616097,width-600,resizemode-4/106616097.jpg"
    },
    {
      name: "HP",
      imgUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADDCAMAAACxkIT5AAAAflBMVEX///8AAADo6OjW1tbr6+u5ubnb29vOzs7j4+P5+fnf39/09PRtbW22trbQ0ND8/PyAgIAlJSV5eXmmpqYICAjExMRhYWEqKio2NjaMjIygoKCYmJhXV1cwMDBzc3NZWVlNTU2rq6s9PT0WFhYgICASEhJGRkaGhoY6OjqQkJDmsv0eAAAEWElEQVR4nO2de2/iMBDEwyvh0Ya+6YtrKS1tv/8XvON6tQdpKnQKYmR7fn+uImt3nZDxemOqyhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMUkzGdT1+A/Tup6qfREx7UV+qZ0RcQE5GKidEQEpOFf7ImIEOXhQOyPiBnJQ6E/iEFLwrHZGxApycKl2RsQz5GCmdkZDH1LwpHZGxAPkYKR2RsRrTMHVRO2MhgHcBhdqZ0ScQQ4atTMaJuuYgle1MyKu4Ta4UzsjAnXyWO2Mhgmk4EXtjAjr5F2dPFQ7owF18qPaGRHWyVW1hByofRGBOrnUejLq5FbtjAjQyYu52hkNqJM/1c6IOIEc1GpnNMwgBbdqZ0ScWidXG8iB68m9G7UzIu6tk6uXmIK3Qh8F6+SquoMcFFpPxr6LUpeMDaSg1Hoy6uRC+y5QJ2/UzohAnXwfzU3TDra0LfxMTpu2/TK2451L/1mbRN+sj5CDUE+eXUXjR7h0RbXUExsgKXgLEirH02BdROM67M2P4dJEhTaPFius4f7me/MZFKTPIYQwt9ixexIu5TXHD7CmWYWrIYKokz/Bev1tnEObyisdINHGjXcIIbwA5rcQbZhbrDk+0AHSbHCewM/ceYgWH/yzcC1qqfhmBOPyuL4fCq6T8cEPc4t781FLZVCQ/gUhRJ0MxkUw8ppjBkIbIoit+vzBRy3V/zailkq0cYPP7Q2LFqXQEx1gdVzfDwWd2/3KcUQHSHOtwPuTV2DlyjEYcc2ZlU7GppygHLmWyqAgvWHR8s0GqqUyKEjzVQGugaJOhr35JdVSiepkXk+GRVRcIPMe1gwK0hDBOhhbsEadjFoq7s3DIurtqJ4fjP/QyXxvHgfIQCfHVQHMLdfJsebIF1EpwUuG1zRaujePi6jnY3p+OEY0WqqTUTnG12UGjRu0HMznlkuh9OvJMxrtCqxxDUSlUAYfAl7SaGnzOtdSOECiOhnLwWFuxzRa1MmxnowF6eO6fihqGi3VyXxvHm+ODHRyjJYukLkU4ouopKB38v56cigZzmGAZZpbKw2Nlu4VoJba0AESbdzgayCINq4KuBTiBemUmPdYtHyvAJUj1VKLKkn40S/0wUedHL/1+qFxIyXoJ62oHOMiiuvk9D8ExLmNBdIVWPnrkvZdnFVJMpn2vxhP+9E6jNZYH+Vb6zM6QK5kUDLsyhz35tXOiMhACnUGj9FLUwp1hmupsuA1x7KgPaxlkUHJsDNYMjzdf3mW4NZKmnWSzviMXevkLVBWKvXsMNTJ72pnRPhMhGr2FlPwsf/yLLFOzqEFtTNYYS317DDr5J2+i6tCHwXed1EW1sk5dJl0xvXkn/bmi8Jn7Fonb/Fx0/5blso6eQt89t4r9L8oeMduWdATIAoD+y4KfRR4D2tZ+O8Ld/ou1vsvzxLs2E30+5TODP8ek1YPBm1TaNuFMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhiTO78BzAMspeNwVkgAAAAASUVORK5CYII="
    }
];
  
const  categories = [
    {
      name: "Men's Fashion",
      imgUrl: "https://example.com/images/mens-fashion.png"
    },
    {
      name: "Women's Fashion",
      imgUrl: "https://example.com/images/womens-fashion.png"
    },
    {
      name: "Electronics",
      imgUrl: "https://example.com/images/electronics.png"
    },
    {
      name: "Home Appliances",
      imgUrl: "https://example.com/images/home-appliances.png"
    },
    {
      name: "Beauty & Health",
      imgUrl: "https://example.com/images/beauty-health.png"
    },
    {
      name: "Sports & Outdoors",
      imgUrl: "https://example.com/images/sports-outdoors.png"
    },
    {
      name: "Toys & Hobbies",
      imgUrl: "https://example.com/images/toys-hobbies.png"
    }
  ];


export {
 sliderSettings,
 brands,
 categories,
}
  