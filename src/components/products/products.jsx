import React, { useState, useEffect, useRef } from "react";

const Products = ({ addToCart }) => {
  const [visibleProducts, setVisibleProducts] = useState([]); // Tracks visible products
  const [loading, setLoading] = useState(false); // Tracks loading state
  const products = [
    // Your list of products here...
    {
      name: "Running Shoes",
      caption: "Perfect for your morning jog.",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      price: 50,
    },
    {
      name: "Hiking Boots",
      caption: "Conquer the mountains.",
      image:
        "https://morjas.centracdn.net/client/dynamic/images/813_0fa76ef427-morjas-the-hiking-boot-black-grain-1.jpg",
      price: 120,
    },
    {
      name: "Formal Shoes",
      caption: "Style for your office days.",
      image:
        "https://www.pierrecardinindia.com/wp-content/uploads/2022/12/cognac-leather-formal-shoes.jpg",
      price: 120,
    },
    {
      name: "Casual Sneakers",
      caption: "Everyday comfort and style.",
      image:
        "https://cdn02.outlet46.de/item/images/209891/middle/SS21ROTRIIV.jpg",
      price: 120,
    },
    {
      name: "Soccer Cleats",
      caption: "Score the winning goal.",
      image:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/52c4292c5cfa412d83b3e1e7929c1706_9366/Messi_F50_Pro_Firm_Ground_Soccer_Cleats_Gold_JI2502_01_standard_hover.jpg",
      price: 120,
    },
    {
      name: "Tennis Shoes",
      caption: "Ace your tennis game.",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f42cab19a8494e4b9e16cc96308c8c02_9366/Gamecourt_2.0_Tennis_Shoes_Black_ID1494_01_standard.jpg",
      price: 120,
    },
    {
      name: "Sandals",
      caption: "Cool and casual for summer.",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcROtiCRnqj4af5Q4DvKXA0AWqlOX8H9U3aL3alzFTmhTBlTElINRYO91OFILmRQP6YP2JSbl6k-AZrUbiG8EtSLtllim4YlpwOLVNtw4t-nlhchnGvtI7NO&usqp=CAc",
      price: 120,
    },
    {
      name: "High Heels",
      caption: "Add elegance to your outfit.",
      image:
        "https://www.usatoday.com/gcdn/presto/2020/08/07/USAT/b62fa565-e0a4-4915-9b9b-ecf9020cb280-XXX_148237273.JPG",
      price: 120,
    },
    {
      name: "Loafers",
      caption: "Timeless and comfortable.",
      image:
        "https://www.cos.com/static-images/products/assets/001/bc/74/bc7480f8283dc42a30ac4b820d31d4696e113075_xxl-1.jpg?imwidth=2160",
      price: 120,
    },

    {
      name: "Running Shoes 1",
      caption: "Perfect for your morning jog.",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIWFhIXGBIWFxUWFhUWGxkXFRYWGBYdFhcaHikhGBolHhUVITEhJykrLi4vGCAzODMsNygtLisBCgoKDg0OGhAQGy0gHyU3LS01KzI1LS83LS0uLS0tLS0tLy0vLS01LS0tLS01Ly0rLS0tLTUrLS0tLS0tLSstLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABAcFBgEDCAL/xABBEAABAwIDBQUDCQcDBQAAAAABAAIDBBESITEFBkFRcQcTImGBMpGxFEJSU3KSodHhFzNigrLB8ENEoiNjhJPD/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACsRAQACAgIBAgQFBQAAAAAAAAABAgMRBCExEhMiUWGxFJGh0fEFMkFCcf/aAAwDAQACEQMRAD8AudERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARFF2ptKKnjdLM8MjbqTxPANAzc48gglLjGL4bjEM7Xztzsqf3j7Qp6gmKlxxMOQwfvX9XD92PsnL6Sw+74mpqhtUXWeDdzQbl7T7bXuOtx1zseC0jFMw5MnMx0ntfKKNs6tZNG2WM3Y4XHMcCDyINweikrN1RMTG4ERESIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAqR352w+trHRh3/Ric5jBwGE2e+3Fzjp5W81dwXnTYpNyT7Ra299b3div62WuKO3Fzsk0x9MvQ0jWDwZc3HVd8ueYBPmf8+C+qaFzzhYwvdyte39hbmp209kPgj76okja3kXkE+TTazj5AreZiHhVx5Mm5iJlnezjaJbI+nccngyN8nNsHD1Fj/KVYC8+M3lfFI2SnbZzDdrnjLQg+HUggkZ2Vs9ne85racmQj5REcMtgBcG5Y4AaAgEdWuXNk1M9Pe4NclcUVvGv2bUiIqOwREQEREBERAREQEREBERAREQEREBERBjt4tpfJqWae1+7jc4C9rutZovwu4gKqtyu0maEtirnumhNh3xzkj838ZG/8uui3TtbqMGzZG3zkfCwffDz+DCqMaVaETL1HFI1zQ5pDmuAIcDcEHMEEahfSprsv3vNPIKOYnuJCe6cc+7efm/Yd+B6lWFt3fajpbiR5Mn1bRd3qPm9TZVlMNjuqb2ju9BTVUstTUsjgL5XRxt8Uj2OdiADQLgA5XsdOFwVG3g7Sqqc93AO5a42a1g7yV3kMtbcAL+a6th7hVdS/vKh3cMNy50l3yusbGwJsOrjcfRUxaY8M8mOt41ZOn33wju6CARM+tkALj5tjva/m4uPktdqi+R/eSvdLIfnvOIjybwaPIWCsqo7PqIU74Y2Wnc04J5HFzxIB4HE5ANuBdrQARfJVlTuJb4m4Xglr2nVrmmzgfMEEKF4iIjUIlTCpu5+33UNU2axMZ8ErRxjJFyBxc05joRxXD2XWNqcLfaNkS9LU07ZGNkY4OY4BzXDMFpFwQeS7FW3YpXvfDNE6Rpjjc0xxG/eMxXLieHdk2ta+eK9lZKAiIgIiICIiAiIgIiICIiAiIgIiICIuHEDMmwGZPkgq/twrxgpqe/iLnykcg0YG+/E/3KqSs/vbtg1lVJP8wnDGOUbcme/Nx83Fa28G5BWk11DCmSL2mHHygFzWm9idfPgpkTW4mhzixhc3G5oBIaXDG4X1IBJzWOnjuFLglxNDjqMndQs270FsPd2ko22pogHEZyHxvdqfFIcyNTa4HIL7fE7vLjE4i4GI+AYrE4WjM+yOmduK0fdbfyGGlZHUd6ZYxgAYwu7xg/dnGTYECzTcjS/FY7au/VZUu7qlaYWm/hh8crhn7UlvB/La3Mqd6Z2r6lj7a25TUwHyiZsZOYjAxyOzGjG5+treaqPam0WTVU0sTHBszw5kdsT/AGQHHC2/icQXED6SzWxOziolOOof3Qdm4Xxyu54nHIHzzVk7C2FSUjbQxtaeL/aeftO19FC+lYR7lVz4XzOb3TQAQz2pXXIByGTMiTnfzCxe5m489YJJHNMQZe5fm57r+y3yy9rTSwPC/m4TkCOn6LH7afJBTSPpo2mQAlrbAC/Qf51Vq214RavqjSjanaUtFVh1OO6kguzCQbOabF4kHzmuNutg4HQq7N1t4oq2ESxkB4sJYr3dG/i12QNsjY2zVb7n7sTV/e1la4scC727ZyDMueNBG0cOlrAZ6psh1THVYqWaz2uJ7xuLA9oJGKRp9prr6H6Q0Oa2tEX/AOues+zHfiP8vRaLX90N7Ya+PE3wSi4fC5wxAtDblv02eIeK3HOxyWwLCY06YnYiIoSIiICIiAiIgIiICIiAiIgLVe03apgoJA02fKRC3o++P/gH+8LalU/bPW3mp4L5NY6Qjzkdhb+EbverUjcs8ttUlXN11VMdxiGo+CkALkMXRMbcETqdwxziLXOij0c9nmzXOa4cBxGlr/5osgaJuLMX4i/DoOa7424cwuea6ehW/qjcNq3G3RZVxmeeXBG17mGJps67bHxO4Agg5c9Vv1PV0VG3BBG0eTcyftO/VU+Ktwuy5Ecmbmg5YgLAkeY+AU+k2jIzL22cjqOjvzV60ifLn5GbJSNUjv6rArN6JXZMAaPefy/BQn7QldrI/wC8R+AWKo6pkgu058WnIjqP76KViW0UrHiHh5eTmtPxWn7J0FbK3SR/q4ke51x+CzlFvVIwWkbjHMZH3HI+8LWGvXJck0rK2Ll5cfifz7bltYw19LJTxSd25wd4RZp0IsQRpcg9QFE3N3aFBSS/KrPkdnI4C92NFmtA5XLsuOL3auH2PnwIyI6HgszQbxSsGF1pI9C12tuvH1Hqspx2jw9LF/Ucd+skan9GibtbJkrKx9Rs/wD6IjJlZZxswXtGwm/zs7t0IxjIKz93992SSNpaxhpa7Tung4H/AETFJ7LsWdhe+RAvqfvdF1C10opgI5HEOkYSL314a6rVqTdqap2pK7aET8DfEyRrsLXEACPAWG8YbqNDcA63UTaJ8u6sa7rO9rTRV1Ub11VLtGKia4VcLsDXEtAmaXPde8jSGvLQBe7RkBc3u42BT1DXjK4PFpyI9FnMaaRO3aiIoSIiICIiAiIgIiICIiAqS7U8TtoSOwuwNZEwOwnCbNubO0Obj63V2PdYE8gSsc1luJVq21KmSnrjTzwwjmu5jVfFVsSnm/ewxP8ANzG4vRwsQtW2z2bxEF1M8xOtkyQl8Z8g/wBpvrdaxkhy249o8dquqI8r8RmuGm4uFkdr0E1NJ3c8ZY/gDazhzaRk4dFi4nWJb6j1S8dbThtqfTL6dHiFvd1XZTS38J9sajn5hfIKPja7qNCMiOhVInTa9ItCY0ZggkEaEZEdCFkKfaz25SDGPpCwd6jR34LCtMjc8nj3H9VIhmDsxwyIOoPmtYttxZuPEx8UbbPSVLHi7HA8xoR1GoXetULc76EaEZEdCFNp9qSNyd4xzya736H8Oqvt59+JMf29s8uqpnEbC86AaczoB6mw9VFh2tC7IuwHk/w/icj6FQdr1geQxhu1uZI0LswADxAz9/kp2xx4bTfUwnbqRPfVRWJxF+J5HEe0/wBLC1lcxvYX1Vd9l9Dd0k54Wjb1yc//AOfvKsXFbPlcrlyT2+jwRqjSN7hRU9TFVSMf8qFmt7s2xAuzxNORF3nPXxFd8u98BzMb7jS1svVafvPXfKK/W7Y7gfyan77vwSSRjfaIHUgLSuOJjt5/K5t6ZPTRtEm/Lmm7I3PbykLW5eTm3N+qyVLv9SuykbLGeZaHj3sJP4Ku5q+IfPHpc/2UR+0o+GI9B+at7dWEczlb3r9Fxw70UTtKmMfaOD+qyyUFQx4ux7XDm1wd8FQp2gOEZ9bBdMlS46MaPPUqs4o+bqpzM/8AtSPz/l6FRVLuHvbLDKynnkL4HkNaXG5jc4+GztcBJAtoLgi1iDbSytXT0KXi8bgREVVxERAREQdVU8BjiSALG5OQUJmemi43nhD6OpYRcGCYW/kcvMj3vj/dyPZ9h7mf0kIPUrAuxeWGbxVzfZraof8AkS29xdZSG76bTGlfUffv8Qg9L1+zYpmd3LG18Z+a8XA82nVh8wtA212Vxudipp3Ra+CUF7egkbmB1uVW9D2mbWiN/lXeD6MscbgfUAO/FWJuX2uRVD2wVjBBK6wbICe6c7kb5xk8LkjzUxMwrNInuWFl7M64ey+nf0lcP6mhdEvZ5tMaQNd9mWL+7gruLTxXWYhyHLQaJtOlGncbag/2jvSSA/B66Xbp7Ra4O+Ry8nWaHX5Hwkq9zEPoj3BYrebb8FBA6onNgMmsB8T3nRrBfMn3AXJyCmLImsTGlNVlJLDbv4ZI73t3jHNvbW1xnqPeo7ZgeKwe8m9NRXTmeYMt4mxxlrXtjYeDS4XJ0OLny0WK78fVR6Ycu9b6nC8Xd1y8lf3fow/DR825hw5r6uFqEVSDkGAEtwi0kwz4HN5z8vZ8ly7aAzw943IAASlwBzuTiBJvlkCLWU+6r+Gn5vSO5Wz+6pIgRZxbjdzu/wAVj0BDfRT94KsRU8knENJ62F7epsPVULRdoe0GHwVj7DCAyZkUrbfOxPDGuGWYAB5LaNp9oPyqjMczMEmMNMjMXdSNacTnRlwBGYYMJ+l1tlHcumfhr0xuzMhNM7PCLdcILnepJHuUFjHO8Tzcm/8AnRdk21YG0wYJWF7i0uAIyucR9OHqpm6cTKudsDXgANL3ONx4GEB1rjN3iGWud10zaHlYcdpta2vP2Qo6J7/YY5x/haT8FNg3fqD/ALeX0jf+Su2gpAxjWtuxgHhY2wsOF8r4iNf8KlCIc3fed8LrL3XdHG+ql4d1at3s00vqwt/qsshS9n9W/wBvu4h/E8OPoGXv71bHdt5X6kn4rD7c3qoqQHv6mKM64bgvNuUbbuPuUe5K0cerE7D3Dp4CJHkzSAggvGFjSNC2PiftErZKGpa/GGuvgeWHjZwDXEdRiCpbfHtelnBhoWuijORndlI4f9tv+mDzOefzSrC7JabBsuAnV5mkJOZOKR1iTxJAGapMzPlrWsV6huCIihYREQERCgw++MhbQ1RaSHCCcgjUERu0XmR9Q462Pna3wsvUW0YBIx0bhdj2ua4Z5tcCCMvIqsto9krDcwTvaODZGh/oHCxt1BQVI5oPAj1XS5o81YVT2UVw9h0Th9pw+LVEd2XbS+rYekjUGj931XX3d/DfM6X4+V+C3sdmO0vqW/8AsZ+a+Knsx2la4gBPISR5+9wQZjsx7TnU+Gkr3F1Pk2OY3Lov4ZOLo+R1b5j2b1he17Q5jg5rhcOaQQQdCCMiF5w/ZptM2vTgZZ3kj/sSslsvdLbtICKZ742n5rJm4b/Yd4b+dkF1bzbdgoYHVFQ6zRk1otie7g1g4uP6nJeat7N5J9oVBnmyaLiKIG7Y2chzceLuPQADZNobi7YqH95UYpX6AyTNdYcmi9mjyCjfs02j9Uz74QaY5dZW7/sz2j9Wz7/6Lrd2Y7R+rZ9/9EGlr7kz8XE69efr+a249me0vqm/fH5L6Z2bbRH+i0g5Hxj/ADzQaYpdLVubax0IcOWIAgG2l7Ei/mVs37Ndo/UD77fzX2zs12j9S31e1BhYtqPBBDiCHOeCMiHOBDiCOJBI9VJptrTRujkile2SMnuiDfBfI4Wm4sb5i1jxWai7NNofVxjq79FMh7Mq8m7u7HKxd8A1BCm7QtsH/fW6QwD8e71UWo3y2q8Z7Ql8w3Az3FrQVs0PZbUH2ntHQE/kp9N2Un58rz9kNb8boKtq9r1bxaSrqHjk+eVw9xcsa2DMADMm1hqSdOqvyi7MKRuboi8/xvPwbYLa9lbDjgFoYY4/sMa0+pAuUFK7n9l1ZUua+dhp4MiXPFpHDkyM5g+bgB10V+bOoWQRMhiFo42tY0XJyaLC5Op819NY7iV2gIOUREBERAREQLLjCFyiBZERAREQEsiIFksiIFlxhC5RBxhHJMI5LlEHGEcksuUQLIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//9k=",
      price: 50,
    },
    {
      name: "Hiking Boots 2",
      caption: "Conquer the mountains.",
      image:
        "https://morjas.centracdn.net/client/dynamic/images/813_0fa76ef427-morjas-the-hiking-boot-black-grain-1.jpg",
      price: 120,
    },
    {
      name: "Hiking Boots 2",
      caption: "Conquer the mountains.",
      image:
        "https://morjas.centracdn.net/client/dynamic/images/813_0fa76ef427-morjas-the-hiking-boot-black-grain-1.jpg",
      price: 120,
    },
  
  ];

  const loadMoreRef = useRef(null); // Ref to observe when the last product is visible

  // Helper function to simulate delay
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Update visible products with the next 6 products after delay
      setVisibleProducts((prevProducts) => [
        ...prevProducts,
        ...products.slice(prevProducts.length, prevProducts.length + 6),
      ]);
    }, 2000); // 2 seconds delay
  };

  useEffect(() => {
    // Initially show the first 6 products
    setVisibleProducts(products.slice(0, 6));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          simulateLoading();
        }
      },
      {
        rootMargin: "100px", // Trigger before the last product is in view
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6 mb-[90px] backdrop-blur-lg backdrop-saturate-180  bg-opacity-60 rounded-xl m-[30px] p-[50px]">
      {visibleProducts.map((product, index) => (
        <div
          key={index}
          className="card card-compact bg-base-100 w-[380px] shadow-xl"
        >
          <figure>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.caption}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Loader indicator */}
      {loading && visibleProducts.length < products.length && (
        <div className="w-full text-center py-4">
          <p>Loading more products...</p>
        </div>
      )}
      {/* Reference element to trigger load more */}
      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default Products;
