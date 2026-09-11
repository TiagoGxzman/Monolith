// Universal Theme Switcher via body class toggle
window.toggleTheme = function() {
  const body = document.body;
  const isLight = body.classList.toggle('light-theme');
  const newTheme = isLight ? 'light' : 'dark';
  
  localStorage.setItem('theme', newTheme);
  
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
};

// Auto restore theme state when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.getElementById('theme-icon');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  } else {
    document.body.classList.remove('light-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  }

  const terminalLogs = document.getElementById('terminal-logs');
  const appStatus = document.getElementById('app-status');
  const monolithBox = document.getElementById('monolith-box');
  
  const modUser = document.getElementById('mod-user');
  const modCatalog = document.getElementById('mod-catalog');
  const modCart = document.getElementById('mod-cart');
  const modOrder = document.getElementById('mod-order');
  const modPayment = document.getElementById('mod-payment');

  let isSystemAlive = true;
  let isRedeploying = false;

  // Helper for Logging in Simulated Terminal
  function addLog(message, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = log-entry log-;
    entry.innerHTML = <span style="opacity: 0.5;">[]</span> ;
    terminalLogs.appendChild(entry);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  // Clear Highlights
  function clearHighlights() {
    [modUser, modCatalog, modCart, modOrder, modPayment].forEach(mod => {
      mod.classList.remove('active-request', 'faulty');
    });
  }

  // Simulating HTTP Request Processing
  window.simulateRequest = function(reqType) {
    if (!isSystemAlive) {
      addLog(Error 503: La aplicacion Monolitica esta fuera de servicio. No responde a ., 'error');
      return;
    }

    if (isRedeploying) {
      addLog(Advertencia 502 Bad Gateway: La aplicacion se esta desplegando nuevamente. Solicitud rechazada., 'warn');
      return;
    }

    clearHighlights();

    if (reqType === 'LOGIN') {
      addLog(Request: POST /api/v1/auth/login, 'req');
      modUser.classList.add('active-request');
      setTimeout(() => {
        addLog(Monolito: Logica de Usuarios ejecutada en el mismo proceso (PID 4021)., 'info');
        addLog(DB: Consulta unificada a la tabla 'users'., 'info');
        addLog(Response 200 OK: Sesion iniciada con exito., 'success');
        setTimeout(clearHighlights, 1000);
      }, 500);
    } else if (reqType === 'CATALOG') {
      addLog(Request: GET /api/v1/products, 'req');
      modCatalog.classList.add('active-request');
      setTimeout(() => {
        addLog(Monolito: Modulo de Catalogo consultando inventarios., 'info');
        addLog(DB: Consulta unificada a la tabla 'products'., 'info');
        addLog(Response 200 OK: 12 Productos obtenidos., 'success');
        setTimeout(clearHighlights, 1000);
      }, 500);
    } else if (reqType === 'CHECKOUT') {
      addLog(Request: POST /api/v1/orders/checkout, 'req');
      modCart.classList.add('active-request');
      modOrder.classList.add('active-request');
      modPayment.classList.add('active-request');
      
      setTimeout(() => {
        addLog(Monolito: Invocacion directa en memoria: Cart -> Orders -> Payments., 'info');
        addLog(DB: Transaccion ACID unica en la base de datos central., 'info');
        addLog(Response 200 OK: Orden #9842 procesada y pagada en 14ms., 'success');
        setTimeout(clearHighlights, 1200);
      }, 600);
    }
  };

  // Simulating Full Monolith Redeployment
  window.simulateRedeploy = function() {
    if (isRedeploying) return;

    isRedeploying = true;
    clearHighlights();
    
    appStatus.className = 'status-badge redeploying';
    appStatus.innerHTML = <span class="status-dot"></span> Redesplegando Monolito...;

    addLog(--------------------------------------------------, 'info');
    addLog(INICIANDO DESPLIEGUE COMPLETO DE LA APLICACION..., 'warn');
    addLog(Empaquetando todos los modulos (Usuarios, Catalogo, Pedidos, Pagos)..., 'info');
    addLog(Deteniendo proceso unico de la aplicacion..., 'warn');

    setTimeout(() => {
      addLog(Compilando artifact monolitico (monolith.jar / dist.js)..., 'info');
    }, 1200);

    setTimeout(() => {
      addLog(Reiniciando servidor web y base de datos..., 'info');
    }, 2400);

    setTimeout(() => {
      isRedeploying = false;
      isSystemAlive = true;
      monolithBox.classList.remove('crashing');
      appStatus.className = 'status-badge';
      appStatus.innerHTML = <span class="status-dot"></span> Monolito Operativo;
      addLog(Despliegue completado con exito. Todos los modulos vuelven a estar en linea., 'success');
      addLog(--------------------------------------------------, 'info');
    }, 3800);
  };

  // Simulating System Crash due to single component failure
  window.simulateCrash = function() {
    if (!isSystemAlive) return;

    clearHighlights();
    isSystemAlive = false;

    modPayment.classList.add('faulty');
    monolithBox.classList.add('crashing');

    appStatus.className = 'status-badge offline';
    appStatus.innerHTML = <span class="status-dot"></span> Monolito Caido (500 Error);

    addLog(ERROR CRITICO EN MODULO DE PAGOS: Unhandled NullPointerException!, 'error');
    addLog(Al compartir el mismo proceso, la falla en Pagos derrumba TODO el Monolito., 'error');
    addLog(Todos los modulos (Usuarios, Productos, Pedidos) han dejado de funcionar., 'error');
    addLog(Se requiere un reinicio o un nuevo despliegue para recuperar la aplicacion., 'warn');
  };

  // Download Monolithic Architecture Documentation Automatically
  window.downloadArchitectureDoc = function() {
    addLog(Generando descarga automatica de la arquitectura..., 'success');

    const content = # RESUMEN TECNICO: ARQUITECTURA MONOLITICA

## 1. Definicion
Un monolito es una arquitectura de software en la que las principales funcionalidades de una aplicacion se encuentran integradas dentro de un mismo sistema y se ejecutan como una sola unidad. El codigo, la logica de negocio, la gestion de usuarios, el procesamiento de informacion y otras funciones pueden estar organizados en diferentes modulos, pero forman parte de una misma aplicacion.

## 2. Caracteristicas Clave
- **Unidad Unica de Despliegue**: Todo el codigo se empaqueta y despliega en un solo bloque ejecutable/artefacto.
- **Base de Datos Compartida**: Los modulos (Usuarios, Pedidos, Productos, etc.) comparten frecuentemente la misma base de datos relacional/central.
- **Comunicacion en Memoria**: Las llamadas entre funciones y modulos se realizan a nivel de codigo (metodos internos), sin necesidad de red (HTTP/gRPC).

## 3. Ejemplo Practico: Tienda Virtual Monolitica
En un e-commerce monolitico conviven en el mismo repositorio y aplicacion:
- Modulo de Inicio de Sesion / Usuarios
- Modulo de Catalogo de Productos
- Modulo de Carrito de Compras
- Modulo de Gestion de Pedidos
- Modulo de Procesamiento de Pagos

Todos estos modulos forman parte del mismo runtime y se ejecutan bajo el mismo proceso.

## 4. Ventajas
- **Simplicidad Inicial**: Facil de organizar, construir y configurar para proyectos pequenos o medianos.
- **Pruebas Sencillas**: Permite realizar pruebas end-to-end ejecutando solo una aplicacion.
- **Rendimiento de Comunicacion**: La llamada entre componentes es inmediata por estar en la misma memoria.

## 5. Desventajas
- **Escalabilidad Limitada**: No es posible escalar solo el modulo con mas trafico (ej: Pagos); debe escalarse toda la aplicacion.
- **Despliegues Complejos a Largo Plazo**: Cualquier pequena modificacion exige un nuevo despliegue completo del monolito.
- **Punto Unico de Falla (Single Point of Failure)**: Un fallo no controlado en un componente puede tirar abajo toda la aplicacion.

## 6. Monolito vs Microservicios
| Aspecto | Arquitectura Monolitica | Microservicios |
| :--- | :--- | :--- |
| Despliegue | Unidad Unica | Independiente por Servicio |
| Base de Datos | Compartida | Una por Servicio |
| Escalabilidad | Vertical u Horizontal Completa | Escalado Granular por Servicio |
| Complejidad Operativa | Baja al inicio, mayor cuando crece en exceso | Alta desde el inicio |

---
Documento generado automaticamente desde la Landing Page Interactiva de Arquitectura Monolitica.
;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Arquitectura_Monolitica_Resumen.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
});