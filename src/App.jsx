import { useState, useMemo } from "react";

const RO = {
  cream: "#FAF8F5", bg: "#F5F2EE", brown: "#3D2B1F", brownLight: "#5C3D2E",
  brownPale: "#8B6F5E", gold: "#C9A96E", goldLight: "#E8D5B0", border: "#E0D5C8",
  borderDark: "#C4B49A", white: "#FFFFFF", text: "#1A0F08", textMuted: "#7A6355",
  success: "#2D6A4F", danger: "#8B2020", warning: "#7A5C00",
};

const PRICE_LISTS = {
  lista1: "Lista 1 · Distribuidor", lista2: "Lista 2 · Revendedor",
  lista3: "Lista 3 · Especial", lista4: "Lista 4 · Minorista", lista5: "Lista 5 · Exportación",
};

const INITIAL_USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "Administrador", priceList: "lista1" },
  { id: 2, username: "vendedor1", password: "vend123", role: "vendedor", name: "Carlos Pérez", priceList: "lista1" },
  { id: 3, username: "cliente1", password: "cli123", role: "cliente", name: "Boutique Flores", priceList: "lista2" },
  { id: 4, username: "cliente2", password: "cli456", role: "cliente", name: "Moda Express", priceList: "lista3" },
];

const INITIAL_PRODUCTS = [
  { id: 1, code: "REM-001", name: "Remera Básica Algodón", category: "Remeras", colors: ["Blanco", "Negro", "Gris", "Azul marino"], sizes: ["XS","S","M","L","XL","XXL"], stock: {"Blanco-S":24,"Blanco-M":36,"Blanco-L":18,"Negro-S":30,"Negro-M":42,"Negro-L":24,"Gris-M":20,"Azul marino-M":15}, ingressDate: "2025-03-01", prices: {lista1:2800,lista2:3200,lista3:3600,lista4:4100,lista5:3900}, discount: 0, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", description: "Remera de algodón 100% peinado, corte recto." },
  { id: 2, code: "REM-002", name: "Remera Oversize Estampada", category: "Remeras", colors: ["Blanco", "Negro", "Verde oliva"], sizes: ["S","M","L","XL"], stock: {"Blanco-S":12,"Blanco-M":20,"Negro-M":18,"Negro-L":14,"Verde oliva-M":10}, ingressDate: "2025-02-15", prices: {lista1:3500,lista2:4000,lista3:4500,lista4:5200,lista5:4800}, discount: 20, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80", description: "Remera oversize con estampa artística, corte caído." },
  { id: 3, code: "PAN-001", name: "Pantalón Cargo Urbano", category: "Pantalones", colors: ["Negro","Beige","Verde militar"], sizes: ["S","M","L","XL"], stock: {"Negro-S":8,"Negro-M":16,"Negro-L":12,"Beige-M":10,"Verde militar-M":6}, ingressDate: "2025-03-10", prices: {lista1:7200,lista2:8300,lista3:9400,lista4:10800,lista5:10200}, discount: 0, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80", description: "Pantalón cargo con bolsillos laterales, tela ripstop." },
  { id: 4, code: "PAN-002", name: "Jean Skinny Premium", category: "Pantalones", colors: ["Azul clásico","Negro","Gris"], sizes: ["36","38","40","42","44"], stock: {"Azul clásico-38":20,"Azul clásico-40":25,"Negro-38":18,"Negro-40":22,"Gris-40":12}, ingressDate: "2025-01-20", prices: {lista1:8500,lista2:9800,lista3:11000,lista4:12600,lista5:12000}, discount: 15, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", description: "Jean skinny de alta elasticidad, lavado premium." },
  { id: 5, code: "VES-001", name: "Vestido Midi Floral", category: "Vestidos", colors: ["Floral rosa","Floral azul","Floral verde"], sizes: ["XS","S","M","L"], stock: {"Floral rosa-S":15,"Floral rosa-M":20,"Floral azul-M":18,"Floral verde-S":8}, ingressDate: "2025-03-05", prices: {lista1:9200,lista2:10600,lista3:11900,lista4:13700,lista5:13000}, discount: 0, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80", description: "Vestido midi con estampado floral, tela viscosa." },
  { id: 6, code: "BUZ-001", name: "Buzo Hoodie Fleece", category: "Buzos", colors: ["Negro","Blanco","Gris melange","Bordo"], sizes: ["S","M","L","XL","XXL"], stock: {"Negro-M":30,"Negro-L":28,"Blanco-M":20,"Gris melange-M":25,"Gris melange-L":18,"Bordo-M":14}, ingressDate: "2025-02-28", prices: {lista1:6800,lista2:7800,lista3:8800,lista4:10100,lista5:9600}, discount: 0, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80", description: "Buzo con capucha, interior fleece, bolsillo canguro." },
  { id: 7, code: "CAM-001", name: "Campera Rompeviento", category: "Camperas", colors: ["Negro","Azul eléctrico","Rojo"], sizes: ["S","M","L","XL"], stock: {"Negro-M":12,"Negro-L":10,"Azul eléctrico-M":8,"Rojo-M":6}, ingressDate: "2025-02-01", prices: {lista1:11500,lista2:13200,lista3:14900,lista4:17100,lista5:16200}, discount: 30, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80", description: "Campera rompeviento impermeable, capucha desmontable." },
  { id: 8, code: "VES-002", name: "Vestido Corto Liso", category: "Vestidos", colors: ["Negro","Blanco","Rojo","Verde"], sizes: ["XS","S","M","L"], stock: {"Negro-S":18,"Negro-M":22,"Blanco-M":15,"Rojo-S":10,"Verde-M":8}, ingressDate: "2025-03-12", prices: {lista1:7800,lista2:8900,lista3:10100,lista4:11600,lista5:11000}, discount: 0, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80", description: "Vestido corto escote en V, tela bengalina." },
];

const COLOR_MAP = {
  "Blanco":"#F5F5F5","Negro":"#1a1a1a","Gris":"#9E9E9E","Azul marino":"#1A237E",
  "Verde oliva":"#6B7C3A","Beige":"#D4C5A9","Verde militar":"#4A5240","Azul clásico":"#1565C0",
  "Floral rosa":"#E91E8C","Floral azul":"#1976D2","Floral verde":"#388E3C","Gris melange":"#B0BEC5",
  "Bordo":"#7B1FA2","Azul eléctrico":"#0288D1","Rojo":"#D32F2F","Verde":"#388E3C",
};

const fmt = (n) => `$${Math.round(n).toLocaleString("es-AR")}`;
const fmtDate = (d) => { if (!d) return "—"; const [y,m,day]=d.split("-"); return `${day}/${m}/${y}`; };

export default function App() {
  const [session, setSession] = useState(null);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("catalog");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({ category:"", color:"", size:"", search:"", inStock:false, onSale:false });
  const [toast, setToast] = useState(null);

  const notify = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const getPrice = (p, pl) => p.discount > 0 ? p.prices[pl]*(1-p.discount/100) : p.prices[pl];

  const addToCart = (product, color, size, qty) => {
    const key = `${product.id}-${color}-${size}`;
    setCart(prev => {
      const ex = prev.find(i=>i.key===key);
      if (ex) return prev.map(i=>i.key===key?{...i,qty:i.qty+qty}:i);
      return [...prev, {key,product,color,size,qty}];
    });
    notify(`✓ ${product.name} agregado`);
  };

  const placeOrder = () => {
    if (!cart.length) return;
    const order = { id:Date.now(), date:new Date().toLocaleString("es-AR"), user:session, items:cart, total:cart.reduce((s,i)=>s+getPrice(i.product,session.priceList)*i.qty,0), status:"Pendiente" };
    setOrders(prev=>[order,...prev]); setCart([]); setView("orders"); notify("🎉 Pedido confirmado");
  };

  const categories = [...new Set(products.map(p=>p.category))];
  const allColors = [...new Set(products.flatMap(p=>p.colors))];
  const allSizes = [...new Set(products.flatMap(p=>p.sizes))];

  const filtered = useMemo(()=>products.filter(p=>{
    if (filters.category && p.category!==filters.category) return false;
    if (filters.color && !p.colors.includes(filters.color)) return false;
    if (filters.size && !p.sizes.includes(filters.size)) return false;
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase()) && !p.code.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.inStock && Object.values(p.stock).reduce((a,b)=>a+b,0)===0) return false;
    if (filters.onSale && p.discount===0) return false;
    return true;
  }),[products,filters]);

  if (!session) return <Login users={users} onLogin={u=>{setSession(u);setView("catalog");}}/>;

  const navItems = [
    {id:"catalog",label:"Catálogo"},
    {id:"cart",label:`Carrito${cart.length?` (${cart.length})`:""}`},
    {id:"orders",label:"Pedidos"},
    ...(session.role==="admin"?[{id:"admin",label:"Admin"}]:[]),
  ];

  return (
    <div style={{minHeight:"100vh",background:RO.bg,fontFamily:"Georgia,serif",color:RO.text}}>
      {toast && <div style={{position:"fixed",top:16,right:16,zIndex:9999,padding:"12px 20px",borderRadius:8,color:"#fff",fontSize:14,fontFamily:"sans-serif",background:toast.type==="success"?RO.success:RO.danger,boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>{toast.msg}</div>}

      {/* HEADER */}
      <header style={{background:RO.white,borderBottom:`1px solid ${RO.border}`,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(61,43,31,0.06)"}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {/* RO monogram SVG */}
            <svg width="44" height="44" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <text x="20" y="240" fontFamily="Georgia,serif" fontSize="220" fill="#3D2B1F" fontWeight="normal">RO</text>
            </svg>
            <div>
              <div style={{fontSize:11,color:RO.brownPale,letterSpacing:3,fontFamily:"sans-serif",fontWeight:700}}>APPAREL IMPORTERS</div>
              <div style={{fontSize:9,color:RO.textMuted,letterSpacing:2,fontFamily:"sans-serif"}}>& WHOLESALERS</div>
            </div>
          </div>
          <nav style={{display:"flex",gap:4}}>
            {navItems.map(n=>(
              <button key={n.id} onClick={()=>setView(n.id)} style={{background:"none",border:"none",color:view===n.id?RO.brown:RO.textMuted,padding:"8px 16px",borderRadius:6,cursor:"pointer",fontSize:13,fontFamily:"sans-serif",fontWeight:view===n.id?700:500,background:view===n.id?RO.bg:"none"}}>
                {n.label}
              </button>
            ))}
          </nav>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{color:RO.textMuted,fontSize:13,fontFamily:"sans-serif"}}>{session.name}</span>
            <span style={{fontSize:10,fontWeight:700,borderRadius:4,padding:"2px 8px",color:RO.cream,letterSpacing:1,fontFamily:"sans-serif",background:{admin:RO.brown,vendedor:RO.brownPale,cliente:RO.gold}[session.role]}}>{session.role}</span>
            <button onClick={()=>{setSession(null);setCart([]);}} style={{background:RO.bg,border:`1px solid ${RO.border}`,color:RO.textMuted,borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontFamily:"sans-serif"}}>Salir</button>
          </div>
        </div>
      </header>

      <main style={{maxWidth:1320,margin:"0 auto",padding:"24px 16px"}}>
        {view==="catalog" && <CatalogView products={filtered} categories={categories} allColors={allColors} allSizes={allSizes} filters={filters} setFilters={setFilters} session={session} getPrice={getPrice} onSelect={setSelectedProduct} onAddToCart={addToCart}/>}
        {view==="cart" && <CartView cart={cart} session={session} getPrice={getPrice} onRemove={k=>setCart(p=>p.filter(i=>i.key!==k))} onPlace={placeOrder} setView={setView}/>}
        {view==="orders" && <OrdersView orders={session.role==="admin"?orders:orders.filter(o=>o.user.id===session.id)} session={session} setOrders={setOrders}/>}
        {view==="admin" && session.role==="admin" && <AdminView products={products} setProducts={setProducts} users={users} setUsers={setUsers} orders={orders}/>}
      </main>

      {selectedProduct && <ProductModal product={selectedProduct} session={session} getPrice={getPrice} onClose={()=>setSelectedProduct(null)} onAddToCart={addToCart}/>}
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({users, onLogin}) {
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState("");
  const handle=()=>{ const user=users.find(x=>x.username===u&&x.password===p); if(user)onLogin(user); else setErr("Usuario o contraseña incorrectos"); };
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${RO.cream} 0%,${RO.bg} 50%,${RO.goldLight} 100%)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:16,padding:"48px 40px",width:380,textAlign:"center",boxShadow:"0 16px 60px rgba(61,43,31,0.12)"}}>
        <svg width="100" height="100" viewBox="0 0 400 400" style={{marginBottom:8}}>
          <text x="20" y="310" fontFamily="Georgia,serif" fontSize="300" fill="#3D2B1F">RO</text>
        </svg>
        <p style={{color:RO.brownPale,fontSize:10,letterSpacing:4,marginBottom:8,fontFamily:"sans-serif",fontWeight:700}}>APPAREL IMPORTERS & WHOLESALERS</p>
        <p style={{color:RO.textMuted,fontSize:11,letterSpacing:2,marginBottom:28,fontFamily:"sans-serif"}}>CATÁLOGO MAYORISTA · TEMPORADA 2025</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <input style={{background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:8,padding:"12px 16px",color:RO.text,fontSize:14,outline:"none",fontFamily:"sans-serif",width:"100%",boxSizing:"border-box"}} placeholder="Usuario" value={u} onChange={e=>setU(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/>
          <input type="password" style={{background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:8,padding:"12px 16px",color:RO.text,fontSize:14,outline:"none",fontFamily:"sans-serif",width:"100%",boxSizing:"border-box"}} placeholder="Contraseña" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/>
          {err && <p style={{color:RO.danger,fontSize:12,margin:0,fontFamily:"sans-serif"}}>{err}</p>}
          <button onClick={handle} style={{background:RO.brown,color:RO.cream,border:"none",borderRadius:8,padding:13,fontSize:13,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"sans-serif"}}>INGRESAR</button>
        </div>
        <p style={{color:"#C4B49A",fontSize:11,marginTop:28,lineHeight:1.8,fontFamily:"sans-serif"}}>Demo: admin/admin123 · vendedor1/vend123 · cliente1/cli123</p>
      </div>
    </div>
  );
}

// ── CATALOG ───────────────────────────────────────────────────────────────────
function CatalogView({products,categories,allColors,allSizes,filters,setFilters,session,getPrice,onSelect,onAddToCart}) {
  const clear=()=>setFilters({category:"",color:"",size:"",search:"",inStock:false,onSale:false});
  return (
    <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:24}}>
      <aside style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,padding:20,height:"fit-content",position:"sticky",top:80}}>
        <p style={{color:RO.brownPale,fontSize:10,letterSpacing:3,marginBottom:12,fontWeight:700,fontFamily:"sans-serif"}}>FILTRAR</p>
        <input style={{width:"100%",background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:8,padding:"10px 12px",color:RO.text,fontSize:13,marginBottom:16,boxSizing:"border-box",outline:"none",fontFamily:"sans-serif"}} placeholder="Buscar modelo o código…" value={filters.search} onChange={e=>setFilters(f=>({...f,search:e.target.value}))}/>
        {[["Categoría","category",categories],["Color","color",allColors],["Talle","size",allSizes]].map(([lbl,key,opts])=>(
          <div key={key} style={{marginBottom:12}}>
            <p style={{color:RO.textMuted,fontSize:10,letterSpacing:2,marginBottom:6,fontWeight:700,fontFamily:"sans-serif"}}>{lbl}</p>
            <select style={{width:"100%",background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:6,padding:"8px 10px",color:RO.text,fontSize:13,outline:"none",fontFamily:"sans-serif"}} value={filters[key]} onChange={e=>setFilters(f=>({...f,[key]:e.target.value}))}>
              <option value="">Todos</option>
              {opts.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>
          {[["Solo con stock","inStock"],["En liquidación","onSale"]].map(([lbl,key])=>(
            <label key={key} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:RO.brownLight,fontFamily:"sans-serif"}}>
              <input type="checkbox" checked={filters[key]} onChange={e=>setFilters(f=>({...f,[key]:e.target.checked}))} style={{accentColor:RO.brown}}/>{lbl}
            </label>
          ))}
        </div>
        <button onClick={clear} style={{width:"100%",background:"none",border:`1px solid ${RO.border}`,color:RO.textMuted,borderRadius:6,padding:8,cursor:"pointer",fontSize:12,marginTop:12,fontFamily:"sans-serif"}}>Limpiar filtros</button>
        <div style={{background:RO.bg,borderRadius:8,padding:"10px 12px",display:"flex",flexDirection:"column",gap:4,borderTop:`1px solid ${RO.border}`,marginTop:16,paddingTop:16}}>
          <span style={{fontSize:10,color:RO.brownPale,letterSpacing:1,fontFamily:"sans-serif"}}>TU LISTA</span>
          <span style={{color:RO.brown,fontWeight:700,fontSize:12}}>{PRICE_LISTS[session.priceList]}</span>
        </div>
      </aside>
      <div>
        <div style={{marginBottom:16,color:RO.textMuted,fontSize:12,fontFamily:"sans-serif"}}>{products.length} modelos</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>
          {products.map(p=><ProductCard key={p.id} product={p} session={session} getPrice={getPrice} onSelect={onSelect} onAddToCart={onAddToCart}/>)}
          {products.length===0 && <div style={{color:RO.textMuted,padding:40,fontFamily:"sans-serif"}}>Sin resultados.</div>}
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({product,session,getPrice,onSelect}) {
  const totalStock=Object.values(product.stock).reduce((a,b)=>a+b,0);
  const price=getPrice(product,session.priceList);
  const hasDiscount=product.discount>0;
  return (
    <div onClick={()=>onSelect(product)} style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,overflow:"hidden",cursor:"pointer"}}>
      <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden"}}>
        <img src={product.image} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.src="https://via.placeholder.com/400x500?text=Sin+foto"}/>
        {totalStock===0 && <div style={{position:"absolute",inset:0,background:"rgba(250,248,245,0.85)",display:"flex",alignItems:"center",justifyContent:"center",color:RO.danger,fontWeight:700,fontSize:13,letterSpacing:2,fontFamily:"sans-serif"}}>SIN STOCK</div>}
        {hasDiscount && <div style={{position:"absolute",top:10,right:10,background:RO.danger,color:"#fff",fontSize:11,fontWeight:700,padding:"4px 8px",borderRadius:6,letterSpacing:1,fontFamily:"sans-serif"}}>{product.discount}% OFF</div>}
        <div style={{position:"absolute",top:8,left:8,background:"rgba(61,43,31,0.7)",color:"#E8D5B0",fontSize:10,padding:"2px 6px",borderRadius:4,letterSpacing:1,fontFamily:"sans-serif"}}>{product.code}</div>
      </div>
      <div style={{padding:"12px 14px"}}>
        <p style={{color:RO.textMuted,fontSize:10,letterSpacing:2,margin:"0 0 4px",fontWeight:700,fontFamily:"sans-serif"}}>{product.category}</p>
        <h3 style={{color:RO.brown,fontSize:14,fontWeight:700,margin:"0 0 8px",lineHeight:1.3}}>{product.name}</h3>
        <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:8}}>
          {product.colors.slice(0,5).map(c=>(
            <span key={c} title={c} style={{width:14,height:14,borderRadius:"50%",display:"inline-block",flexShrink:0,background:COLOR_MAP[c]||"#ccc",border:c==="Blanco"?`1px solid ${RO.borderDark}`:"none"}}/>
          ))}
          {product.colors.length>5 && <span style={{fontSize:10,color:RO.textMuted,fontFamily:"sans-serif"}}>+{product.colors.length-5}</span>}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div>
            {hasDiscount && <span style={{textDecoration:"line-through",color:RO.textMuted,fontSize:11,display:"block",fontFamily:"sans-serif"}}>{fmt(product.prices[session.priceList])}</span>}
            <span style={{color:RO.brown,fontWeight:800,fontSize:15}}>{fmt(price)}</span>
          </div>
          <span style={{fontSize:11,color:totalStock>0?RO.success:RO.danger,fontFamily:"sans-serif"}}>{totalStock>0?`${totalStock} u.`:"Sin stock"}</span>
        </div>
        <p style={{fontSize:10,color:RO.textMuted,marginTop:4,fontFamily:"sans-serif"}}>Ingreso: {fmtDate(product.ingressDate)}</p>
      </div>
    </div>
  );
}

// ── PRODUCT MODAL ─────────────────────────────────────────────────────────────
function ProductModal({product,session,getPrice,onClose,onAddToCart}) {
  const [selColor,setSelColor]=useState(product.colors[0]);
  const [selSize,setSelSize]=useState("");
  const [qty,setQty]=useState(6);
  const stockKey=selColor&&selSize?`${selColor}-${selSize}`:null;
  const avail=stockKey?(product.stock[stockKey]||0):null;
  const price=getPrice(product,session.priceList);
  const hasDiscount=product.discount>0;
  const totalStock=Object.values(product.stock).reduce((a,b)=>a+b,0);

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,15,8,0.7)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:16,maxWidth:860,width:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative"}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:16,right:16,background:RO.bg,border:`1px solid ${RO.border}`,color:RO.brown,width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16,zIndex:10,fontFamily:"sans-serif"}}>✕</button>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
          <div style={{position:"relative"}}>
            <img src={product.image} alt={product.name} style={{width:"100%",aspectRatio:"3/4",objectFit:"cover",borderRadius:"16px 0 0 16px"}} onError={e=>e.target.src="https://via.placeholder.com/500x600?text=Sin+foto"}/>
            {hasDiscount && <div style={{position:"absolute",top:16,left:16,background:RO.danger,color:"#fff",fontSize:13,fontWeight:700,padding:"6px 12px",borderRadius:6,letterSpacing:1,fontFamily:"sans-serif"}}>{product.discount}% LIQUIDACIÓN</div>}
          </div>
          <div style={{padding:28,display:"flex",flexDirection:"column",gap:0}}>
            <p style={{color:RO.textMuted,fontSize:12,letterSpacing:2,margin:0,fontFamily:"sans-serif"}}>{product.code} · {product.category}</p>
            <h2 style={{fontSize:22,fontWeight:700,color:RO.brown,margin:"8px 0 12px",lineHeight:1.2}}>{product.name}</h2>
            <p style={{color:RO.textMuted,fontSize:13,lineHeight:1.6,fontFamily:"sans-serif",marginBottom:16}}>{product.description}</p>
            <div style={{background:RO.bg,borderRadius:8,padding:"12px 16px",marginBottom:12}}>
              <span style={{fontSize:11,color:RO.textMuted,fontFamily:"sans-serif"}}>{PRICE_LISTS[session.priceList]}</span>
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:2}}>
                {hasDiscount && <span style={{textDecoration:"line-through",color:RO.textMuted,fontSize:15,fontFamily:"sans-serif"}}>{fmt(product.prices[session.priceList])}</span>}
                <span style={{color:RO.brown,fontSize:26,fontWeight:800}}>{fmt(price)}</span>
                {hasDiscount && <span style={{color:RO.danger,fontSize:12,fontWeight:700,fontFamily:"sans-serif"}}>−{product.discount}%</span>}
              </div>
            </div>
            <p style={{fontSize:11,color:RO.textMuted,marginBottom:16,fontFamily:"sans-serif"}}>Ingreso: {fmtDate(product.ingressDate)} · Stock total: {totalStock} u.</p>

            <p style={{color:RO.textMuted,fontSize:10,letterSpacing:2,marginBottom:6,fontWeight:700,fontFamily:"sans-serif"}}>COLOR</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
              {product.colors.map(c=>(
                <button key={c} onClick={()=>{setSelColor(c);setSelSize("");}} style={{width:28,height:28,borderRadius:"50%",cursor:"pointer",border:"none",background:COLOR_MAP[c]||"#ccc",flexShrink:0,outline:selColor===c?`3px solid ${RO.brown}`:"none",outlineOffset:2}} title={c}/>
              ))}
            </div>
            {selColor&&<p style={{fontSize:11,color:RO.textMuted,marginTop:-8,marginBottom:12,fontFamily:"sans-serif"}}>{selColor}</p>}

            <p style={{color:RO.textMuted,fontSize:10,letterSpacing:2,marginBottom:6,fontWeight:700,fontFamily:"sans-serif"}}>TALLE</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {product.sizes.map(sz=>{
                const st=product.stock[`${selColor}-${sz}`]||0;
                const active=selSize===sz;
                return (
                  <button key={sz} onClick={()=>setSelSize(sz)} disabled={st===0}
                    style={{background:active?RO.brown:RO.cream,border:`1px solid ${active?RO.brown:RO.border}`,color:active?RO.cream:RO.brownLight,borderRadius:6,padding:"6px 12px",cursor:st===0?"not-allowed":"pointer",fontSize:13,minWidth:48,textAlign:"center",fontFamily:"sans-serif",opacity:st===0?0.3:1}}>
                    {sz}
                    {st>0&&<span style={{display:"block",fontSize:9,color:active?RO.cream:RO.textMuted}}>{st}u</span>}
                  </button>
                );
              })}
            </div>

            <p style={{color:RO.textMuted,fontSize:10,letterSpacing:2,marginBottom:6,fontWeight:700,fontFamily:"sans-serif"}}>CANTIDAD</p>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{background:RO.cream,border:`1px solid ${RO.border}`,color:RO.brown,width:32,height:32,borderRadius:6,cursor:"pointer",fontSize:18,fontFamily:"sans-serif"}}>−</button>
              <span style={{fontSize:20,fontWeight:700,color:RO.brown,minWidth:32,textAlign:"center"}}>{qty}</span>
              <button onClick={()=>setQty(q=>q+1)} style={{background:RO.cream,border:`1px solid ${RO.border}`,color:RO.brown,width:32,height:32,borderRadius:6,cursor:"pointer",fontSize:18,fontFamily:"sans-serif"}}>+</button>
              {avail!==null&&<span style={{fontSize:12,color:avail>0?RO.success:RO.danger,fontFamily:"sans-serif"}}>{avail>0?`${avail} disponibles`:"Sin stock"}</span>}
            </div>

            <button style={{width:"100%",background:RO.brown,border:"none",color:RO.cream,borderRadius:8,padding:14,fontSize:13,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"sans-serif",opacity:(!selColor||!selSize||avail===0)?0.4:1}}
              disabled={!selColor||!selSize||avail===0}
              onClick={()=>{onAddToCart(product,selColor,selSize,qty);onClose();}}>
              AGREGAR AL PEDIDO
            </button>

            <div style={{background:RO.bg,borderRadius:8,padding:12,marginTop:16}}>
              <p style={{color:RO.textMuted,fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:700,fontFamily:"sans-serif"}}>STOCK DISPONIBLE</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {Object.entries(product.stock).filter(([,v])=>v>0).map(([k,v])=>(
                  <span key={k} style={{background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:4,padding:"3px 8px",fontSize:11,color:RO.brownLight,fontFamily:"sans-serif"}}>{k}: <b>{v}</b></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CART ──────────────────────────────────────────────────────────────────────
function CartView({cart,session,getPrice,onRemove,onPlace,setView}) {
  const total=cart.reduce((s,i)=>s+getPrice(i.product,session.priceList)*i.qty,0);
  if (!cart.length) return (
    <div style={{textAlign:"center",color:RO.textMuted,padding:"80px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
      <p style={{fontSize:40}}>🛒</p><p style={{fontFamily:"sans-serif"}}>Tu carrito está vacío</p>
      <button onClick={()=>setView("catalog")} style={{background:RO.brown,border:"none",color:RO.cream,borderRadius:8,padding:"14px 24px",fontSize:13,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"sans-serif"}}>Ver catálogo</button>
    </div>
  );
  return (
    <div style={{maxWidth:860,margin:"0 auto"}}>
      <h2 style={{color:RO.brown,fontSize:18,fontWeight:700,letterSpacing:3,marginBottom:24,fontFamily:"sans-serif"}}>TU PEDIDO</h2>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
        {cart.map(item=>{
          const p=getPrice(item.product,session.priceList);
          return (
            <div key={item.key} style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,padding:16,display:"flex",gap:16,alignItems:"center"}}>
              <img src={item.product.image} alt="" style={{width:72,height:90,objectFit:"cover",borderRadius:8,flexShrink:0}} onError={e=>e.target.src="https://via.placeholder.com/80"}/>
              <div style={{flex:1}}>
                <p style={{color:RO.brown,fontWeight:700,margin:0}}>{item.product.name}</p>
                <p style={{color:RO.textMuted,fontSize:13,margin:"2px 0",fontFamily:"sans-serif"}}>{item.color} · Talle {item.size}</p>
                {item.product.discount>0&&<p style={{color:RO.danger,fontSize:11,margin:0,fontFamily:"sans-serif"}}>{item.product.discount}% de descuento aplicado</p>}
                <p style={{color:RO.gold,margin:0,fontWeight:700}}>{fmt(p)} × {item.qty} = {fmt(p*item.qty)}</p>
              </div>
              <button onClick={()=>onRemove(item.key)} style={{background:"none",border:"none",color:RO.textMuted,cursor:"pointer",fontSize:18}}>✕</button>
            </div>
          );
        })}
      </div>
      <div style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,padding:24,display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:RO.textMuted,fontFamily:"sans-serif"}}>TOTAL DEL PEDIDO</span>
          <span style={{color:RO.brown,fontSize:28,fontWeight:800}}>{fmt(total)}</span>
        </div>
        <button onClick={onPlace} style={{background:RO.brown,border:"none",color:RO.cream,borderRadius:8,padding:14,fontSize:13,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"sans-serif"}}>CONFIRMAR PEDIDO</button>
      </div>
    </div>
  );
}

// ── ORDERS ────────────────────────────────────────────────────────────────────
function OrdersView({orders,session,setOrders}) {
  const statusColors={Pendiente:{bg:"#FFF3CD",color:RO.warning},Confirmado:{bg:"#D1ECF1",color:"#0C5460"},Enviado:{bg:"#D4EDDA",color:RO.success},Cancelado:{bg:"#F8D7DA",color:RO.danger}};

  const downloadPDF=(order)=>{
    const lines=order.items.map(i=>`  • ${i.product.name} (${i.color}, T.${i.size}) x${i.qty} = ${fmt(i.product.prices[order.user.priceList]*i.qty)}`).join("\n");
    const content=`RO · APPAREL IMPORTERS & WHOLESALERS\n${"─".repeat(50)}\nPedido #${String(order.id).slice(-6)}\nFecha: ${order.date}\nCliente: ${order.user.name}\nLista: ${PRICE_LISTS[order.user.priceList]}\nEstado: ${order.status}\n${"─".repeat(50)}\nDETALLE:\n${lines}\n${"─".repeat(50)}\nTOTAL: ${fmt(order.total)}\n${"─".repeat(50)}\nRO · rufinaoferio.com.ar`;
    const blob=new Blob([content],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download=`pedido-RO-${String(order.id).slice(-6)}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!orders.length) return <div style={{textAlign:"center",color:RO.textMuted,padding:"80px 20px",fontFamily:"sans-serif"}}><p style={{fontSize:36}}>📦</p><p>No hay pedidos aún</p></div>;

  return (
    <div style={{maxWidth:860,margin:"0 auto"}}>
      <h2 style={{color:RO.brown,fontSize:18,fontWeight:700,letterSpacing:3,marginBottom:24,fontFamily:"sans-serif"}}>PEDIDOS</h2>
      {orders.map(o=>(
        <div key={o.id} style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,marginBottom:16,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",background:RO.bg,display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${RO.border}`}}>
            <div>
              <p style={{fontWeight:700,color:RO.brown,margin:0}}>Pedido #{String(o.id).slice(-6)}</p>
              <p style={{color:RO.textMuted,fontSize:12,margin:0,fontFamily:"sans-serif"}}>{o.date} · {o.user.name}</p>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:statusColors[o.status]?.bg||"#eee",color:statusColors[o.status]?.color||"#333",fontFamily:"sans-serif"}}>{o.status}</span>
              {session.role==="admin"&&(
                <select style={{background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:6,padding:"4px 8px",fontSize:12,fontFamily:"sans-serif",color:RO.text}} value={o.status} onChange={e=>setOrders(prev=>prev.map(x=>x.id===o.id?{...x,status:e.target.value}:x))}>
                  {["Pendiente","Confirmado","Enviado","Cancelado"].map(s=><option key={s}>{s}</option>)}
                </select>
              )}
              <button onClick={()=>downloadPDF(o)} style={{background:RO.brown,border:"none",color:RO.cream,borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontFamily:"sans-serif"}}>↓ PDF</button>
            </div>
          </div>
          <div style={{padding:"12px 16px"}}>
            {o.items.map(i=>(
              <div key={i.key} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${RO.border}`}}>
                <span style={{color:RO.textMuted,fontSize:13,fontFamily:"sans-serif"}}>{i.product.name} · {i.color} · T.{i.size} × {i.qty}</span>
                <span style={{color:RO.brownLight,fontSize:13,fontWeight:600,fontFamily:"sans-serif"}}>{fmt(i.product.prices[o.user.priceList]*i.qty)}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
              <span style={{color:RO.brown,fontWeight:800}}>Total: {fmt(o.total)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────
function AdminView({products,setProducts,users,setUsers,orders}) {
  const [tab,setTab]=useState("products");
  const [editId,setEditId]=useState(null);
  const [form,setForm]=useState({});
  const [newUser,setNewUser]=useState({username:"",password:"",name:"",role:"cliente",priceList:"lista2"});
  const [showNewUser,setShowNewUser]=useState(false);

  const totalStock=products.reduce((s,p)=>s+Object.values(p.stock).reduce((a,b)=>a+b,0),0);
  const pending=orders.filter(o=>o.status==="Pendiente").length;

  const startEdit=(p)=>{ setEditId(p.id); setForm({image:p.image,prices:{...p.prices},discount:p.discount,ingressDate:p.ingressDate}); };
  const saveEdit=()=>{ setProducts(prev=>prev.map(p=>p.id===editId?{...p,...form,prices:form.prices}:p)); setEditId(null); };
  const addUser=()=>{
    if (!newUser.username||!newUser.password||!newUser.name) return;
    setUsers(prev=>[...prev,{...newUser,id:Date.now()}]);
    setNewUser({username:"",password:"",name:"",role:"cliente",priceList:"lista2"});
    setShowNewUser(false);
  };

  const inputStyle={background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:8,padding:"10px 14px",color:RO.text,fontSize:13,outline:"none",fontFamily:"sans-serif",width:"100%",boxSizing:"border-box"};
  const btnStyle={background:RO.brown,border:"none",color:RO.cream,borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:700,letterSpacing:2,cursor:"pointer",fontFamily:"sans-serif"};

  return (
    <div style={{maxWidth:900,margin:"0 auto"}}>
      <h2 style={{color:RO.brown,fontSize:18,fontWeight:700,letterSpacing:3,marginBottom:24,fontFamily:"sans-serif"}}>PANEL ADMIN</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
        {[{n:products.length,l:"Modelos"},{n:totalStock,l:"Unidades"},{n:orders.length,l:"Pedidos totales"},{n:pending,l:"Pendientes",c:RO.gold}].map((s,i)=>(
          <div key={i} style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,padding:20,textAlign:"center"}}>
            <p style={{fontSize:32,fontWeight:800,margin:0,color:s.c||RO.brown}}>{s.n}</p>
            <p style={{color:RO.textMuted,fontSize:12,margin:"4px 0 0",fontFamily:"sans-serif"}}>{s.l}</p>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:4,marginBottom:20}}>
        {["products","users"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?RO.bg:"none",border:"none",color:tab===t?RO.brown:RO.textMuted,padding:"8px 16px",borderRadius:6,cursor:"pointer",fontSize:13,fontFamily:"sans-serif",fontWeight:tab===t?700:500}}>
            {t==="products"?"Productos":"Usuarios"}
          </button>
        ))}
      </div>

      {tab==="products" && products.map(p=>(
        <div key={p.id} style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,padding:16,display:"flex",gap:16,alignItems:"flex-start",marginBottom:12}}>
          <img src={p.image} alt="" style={{width:60,height:75,objectFit:"cover",borderRadius:6,flexShrink:0}} onError={e=>e.target.src="https://via.placeholder.com/60"}/>
          <div style={{flex:1,minWidth:0}}>
            <p style={{color:RO.brown,margin:0,fontWeight:700}}>{p.code} · {p.name}</p>
            <p style={{color:RO.textMuted,fontSize:12,margin:"2px 0",fontFamily:"sans-serif"}}>{p.category} · Ingreso: {fmtDate(p.ingressDate)}</p>
            {editId===p.id ? (
              <div style={{marginTop:10}}>
                <input style={{...inputStyle,marginBottom:8}} placeholder="URL de foto" value={form.image||""} onChange={e=>setForm(f=>({...f,image:e.target.value}))}/>
                <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                  <label style={{fontSize:12,color:RO.textMuted,fontFamily:"sans-serif",whiteSpace:"nowrap"}}>Fecha ingreso:</label>
                  <input type="date" style={{...inputStyle,width:"auto"}} value={form.ingressDate||""} onChange={e=>setForm(f=>({...f,ingressDate:e.target.value}))}/>
                  <label style={{fontSize:12,color:RO.textMuted,fontFamily:"sans-serif",whiteSpace:"nowrap"}}>Descuento %:</label>
                  <input type="number" min="0" max="100" style={{...inputStyle,width:80}} value={form.discount||0} onChange={e=>setForm(f=>({...f,discount:Number(e.target.value)}))}/>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
                  {Object.entries(PRICE_LISTS).map(([k,v])=>(
                    <label key={k} style={{fontSize:11,color:RO.textMuted,display:"flex",flexDirection:"column",gap:2,fontFamily:"sans-serif"}}>
                      {v.split("·")[0]}
                      <input type="number" style={{...inputStyle,width:90,padding:"4px 8px",fontSize:12}} value={form.prices?.[k]||""} onChange={e=>setForm(f=>({...f,prices:{...f.prices,[k]:Number(e.target.value)}}))}/>
                    </label>
                  ))}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={saveEdit} style={btnStyle}>Guardar</button>
                  <button onClick={()=>setEditId(null)} style={{background:"none",border:`1px solid ${RO.border}`,color:RO.textMuted,borderRadius:8,padding:"10px 20px",fontSize:13,cursor:"pointer",fontFamily:"sans-serif"}}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:4}}>
                {p.discount>0&&<span style={{color:RO.danger,fontSize:12,fontWeight:700,fontFamily:"sans-serif"}}>🏷 {p.discount}% LIQUIDACIÓN</span>}
                {Object.entries(p.prices).map(([k,v])=>(
                  <span key={k} style={{fontSize:11,color:RO.textMuted,fontFamily:"sans-serif"}}>{k}: <b style={{color:RO.brownLight}}>{fmt(v)}</b></span>
                ))}
              </div>
            )}
          </div>
          {editId!==p.id && (
            <button onClick={()=>startEdit(p)} style={{background:RO.bg,border:`1px solid ${RO.border}`,color:RO.brownLight,borderRadius:6,padding:"6px 14px",cursor:"pointer",fontSize:12,whiteSpace:"nowrap",fontFamily:"sans-serif",flexShrink:0}}>Editar</button>
          )}
        </div>
      ))}

      {tab==="users" && (
        <div>
          {users.map(u=>(
            <div key={u.id} style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,padding:16,display:"flex",gap:16,alignItems:"center",marginBottom:12}}>
              <div style={{flex:1}}>
                <p style={{color:RO.brown,fontWeight:700,margin:0}}>{u.name}</p>
                <p style={{color:RO.textMuted,fontSize:12,margin:"2px 0",fontFamily:"sans-serif"}}>@{u.username} · {PRICE_LISTS[u.priceList]}</p>
              </div>
              <span style={{fontSize:10,fontWeight:700,borderRadius:4,padding:"2px 8px",color:RO.cream,letterSpacing:1,fontFamily:"sans-serif",background:{admin:RO.brown,vendedor:RO.brownPale,cliente:RO.gold}[u.role]}}>{u.role}</span>
            </div>
          ))}
          {showNewUser ? (
            <div style={{background:RO.white,border:`1px solid ${RO.border}`,borderRadius:12,padding:20,marginTop:12}}>
              <p style={{color:RO.brownPale,fontSize:10,letterSpacing:3,marginBottom:12,fontWeight:700,fontFamily:"sans-serif"}}>NUEVO USUARIO</p>
              {[["Nombre completo","name"],["Usuario","username"],["Contraseña","password"]].map(([lbl,key])=>(
                <input key={key} style={{...inputStyle,marginBottom:8}} placeholder={lbl} value={newUser[key]} onChange={e=>setNewUser(n=>({...n,[key]:e.target.value}))}/>
              ))}
              <div style={{display:"flex",gap:12,marginBottom:12}}>
                {[["ROL","role",["cliente","vendedor","admin"]],["LISTA","priceList",Object.entries(PRICE_LISTS).map(([k,v])=>({value:k,label:v}))]].map(([lbl,key,opts])=>(
                  <div key={key} style={{flex:1}}>
                    <p style={{color:RO.textMuted,fontSize:10,letterSpacing:2,marginBottom:6,fontWeight:700,fontFamily:"sans-serif"}}>{lbl}</p>
                    <select style={{width:"100%",background:RO.cream,border:`1px solid ${RO.border}`,borderRadius:6,padding:"8px 10px",color:RO.text,fontSize:13,outline:"none",fontFamily:"sans-serif"}} value={newUser[key]} onChange={e=>setNewUser(n=>({...n,[key]:e.target.value}))}>
                      {opts.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={addUser} style={btnStyle}>Crear usuario</button>
                <button onClick={()=>setShowNewUser(false)} style={{background:"none",border:`1px solid ${RO.border}`,color:RO.textMuted,borderRadius:8,padding:"10px 20px",fontSize:13,cursor:"pointer",fontFamily:"sans-serif"}}>Cancelar</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>setShowNewUser(true)} style={{...btnStyle,marginTop:16}}>+ Agregar usuario</button>
          )}
        </div>
      )}
    </div>
  );
}
