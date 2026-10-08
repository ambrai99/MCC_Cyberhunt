/* Shared helpers for the Ironwood Dynamics cyber hunt.
   Everything runs in the browser. Nothing is sent anywhere. */
(function () {
  var C = window.CONFIG;

  // Small non-cryptographic hash (cyrb53). Keeps answers from sitting in plain text.
  // It is obfuscation, not real security, and that is fine for a game.
  function hash(str) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }

  // Lowercase and drop everything except letters and digits, so
  // "D.Reyes", "d.reyes" and "dreyes" all match, and "07/22/1991" == "07221991".
  function clean(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function hh(s) { return hash(C.salt + clean(s)); }

  function guard(flag) {
    try { if (sessionStorage.getItem(flag) !== '1') location.replace('index.html'); }
    catch (e) { location.replace('index.html'); }
  }
  function setFlag(flag) { try { sessionStorage.setItem(flag, '1'); } catch (e) {} }

  function signOut() {
    try { sessionStorage.clear(); localStorage.removeItem('iw_lock'); } catch (e) {}
    location.href = 'index.html';
  }

  // ---- Rotating code word -------------------------------------------------
  function windowMs() { return C.windowMinutes * 60000; }
  function windowIndex(offset) { return Math.floor(Date.now() / windowMs()) + (offset || 0); }
  function wordForIndex(n) {
    var L = C.words.length;
    return C.words[(((n * C.multiplier) % L) + L) % L];
  }
  function wordFor(offset) { return wordForIndex(windowIndex(offset)); }
  function msToNext() { var w = windowMs(); return w - (Date.now() % w); }

  // ---- Account lockout ----------------------------------------------------
  var LK = 'iw_lock';
  function lockState() { try { return JSON.parse(localStorage.getItem(LK) || '{}'); } catch (e) { return {}; } }
  function lockSave(s) { try { localStorage.setItem(LK, JSON.stringify(s)); } catch (e) {} }
  var Lock = {
    remaining: function () { var s = lockState(); return Math.max(0, Math.ceil(((s.until || 0) - Date.now()) / 1000)); },
    fail: function () {
      var s = lockState();
      s.fails = (s.fails || 0) + 1;
      var locked = false;
      if (s.fails >= C.maxAttempts) { s.until = Date.now() + C.lockSeconds * 1000; s.fails = 0; locked = true; }
      lockSave(s);
      return { locked: locked, left: C.maxAttempts - s.fails };
    },
    clear: function () { lockSave({}); }
  };

  function two(n) { return (n < 10 ? '0' : '') + n; }
  function clock(d) {
    var h = d.getHours(), ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + two(d.getMinutes()) + ' ' + ap;
  }

  function clockSec(d) {
    var h = d.getHours(), ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + two(d.getMinutes()) + ':' + two(d.getSeconds()) + ' ' + ap;
  }

  window.IW = { clockSec: clockSec, hash: hash, clean: clean, hh: hh, guard: guard, setFlag: setFlag, signOut: signOut,
                wordFor: wordFor, wordForIndex: wordForIndex, windowIndex: windowIndex, windowMs: windowMs,
                msToNext: msToNext, Lock: Lock, clock: clock, two: two };
})();
