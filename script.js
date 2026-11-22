/* ============================================================
   السيرة الذاتية الرقمية - البراء عثمان كمارا
   ملف التفاعل (RTL)
   ============================================================ */

/* تفعيل تأثيرات الظهور فقط عندما يكون JavaScript متاحًا */
document.documentElement.classList.add("js");

(function () {
  "use strict";

  /* السنة الحالية في التذييل */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ظهور الأقسام عند التمرير */
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* نسخ رقم الهاتف */
  const copyBtn = document.getElementById("copyPhone");
  const toast = document.getElementById("toast");
  const phoneNumber = "0566463875";
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }

  function fallbackCopy(text) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.top = "0";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(input);
    return copied;
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async function () {
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(phoneNumber);
          copied = true;
        } catch (error) {
          copied = false;
        }
      }

      if (!copied) {
        copied = fallbackCopy(phoneNumber);
      }

      showToast(
        copied
          ? "تم نسخ رقم الهاتف بنجاح ✓"
          : "تعذّر النسخ، يمكنك الاتصال بالرقم مباشرة"
      );
    });
  }
})();
