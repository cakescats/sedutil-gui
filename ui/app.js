'use strict';
/* CakesCats Drives: the page. All drive work goes through the "sedutil"
 * command of the Rust side, which runs sedutil-cli -j -S (sedutil-pba docs/json.md).
 * Passwords live only in a dialog until the call returns. */

const TEXT = {
  en: {
    hashLabel: 'Password hash', refresh: 'Rescan', drives: 'Drives', log: 'Command log',
    copy: 'Copy', copied: 'Copied', close: 'Close',
    cancel: 'Cancel', scanning: 'Looking for drives…', noDrives: 'No drives found.',
    pickDrive: 'Choose a drive on the left.',
    st_noAccess: 'No access', st_notSed: 'No TCG', st_notSetUp: 'Not set up',
    st_locked: 'Locked', st_unlocked: 'Unlocked', systemDisk: 'Windows', diskN: 'Disk {0}',
    noAccessNote: 'The drive did not open. The program needs administrator rights, and some USB adapters hide the drive.',
    notSedNote: 'This drive does not speak TCG Opal, so it has no hardware encryption that this program can manage.',
    notSetUpNote: 'Encryption is not turned on for this drive. Setting it up is done from the command line in this version:',
    lockedNote: 'The drive or a part of it is locked: the system cannot read that data until it is unlocked.',
    mbrNote: 'The drive shows the PBA to the system in place of its data (shadow MBR). Unlocking here also switches that off until the next power cycle.',
    noSerial: 'sedutil-cli did not read the serial number of this drive. It is the salt of the password hash, so passwords set in the PBA or in Linux will be refused. Update the program; if this stays, send the command log.',
    systemNote: 'Windows runs from this drive, so locking it is not offered here: the system would stop at once.',
    f_path: 'Device', f_interface: 'Interface', f_serial: 'Serial number', f_firmware: 'Firmware',
    f_ssc: 'Standard', f_owner: 'Owner (SID)', f_pba: 'PBA (shadow MBR)', f_block: 'Logical block',
    f_size: 'Size', f_letters: 'Volumes',
    ownerFactory: 'factory password (nobody took ownership)', ownerSet: 'set', on: 'on', off: 'off',
    g_access: 'Access', g_setup: 'Settings',
    a_unlock: 'Unlock', a_lock: 'Lock', a_ranges: 'Show ranges', a_password: 'Change password', a_pba: 'Write PBA image',
    d_unlock: 'Until the next power cycle', d_lock: 'Data unreadable until unlocked', d_ranges: 'Partitions with their own password',
    d_password: 'The password the PBA asks for', d_pba: 'The screen shown at power on',
    admin1: 'Admin1 password', unlockTitle: 'Unlock the drive',
    unlockText: 'The whole drive (global range) is unlocked until the next power cycle.',
    unlocked: 'Unlocked. If Windows does not show the partitions yet: Disk Management → Action → Rescan Disks.',
    unlockedPartly: 'The whole-drive range is open, but other ranges are still locked. Open them under Show ranges.',
    lockTitle: 'Lock the drive',
    lockText: 'The data of the whole drive becomes unreadable at once, until you unlock it again.',
    lockConfirm: 'Nothing on this drive is open, and I know its password.',
    locked: 'Locked.',
    rangesTitle: 'Locking ranges', rangesText: 'Reading the ranges needs the Admin1 password.',
    r_num: 'Range', r_start: 'Start', r_size: 'Size', r_state: 'State', r_own: 'Own password',
    r_whole: 'whole drive', r_open: 'open', r_closed: 'locked', r_ro: 'read only', r_off: 'locking off',
    r_tries: '{0} of {1} wrong tries', r_triesNoLimit: '{0} wrong tries', yes: 'yes', no: 'no',
    r_unlock: 'Open', r_lock: 'Close', rangeTitle: 'Range {0}',
    whichPw: 'Password of', pwAdmin: 'Admin1', pwRange: 'the range',
    rangePw: 'Password', rangeDone: 'Range {0}: done.',
    pwTitle: 'Change the Admin1 password', oldPw: 'Current password', newPw: 'New password', newPw2: 'New password again',
    pwText: 'The PBA asks for this password at power on. The SID (owner) password does not change.',
    pwMismatch: 'The two new passwords differ.', pwEmpty: 'Enter the password.',
    pwChanged: 'Password changed. Use the new one in the PBA from now on.',
    show: 'Show', hide: 'Hide',
    capsOn: 'Caps Lock is on.',
    nonLatin: 'The password has letters that are not Latin. Check the keyboard layout: the PBA types in the English (US) layout.',
    pbaTitle: 'Write the PBA image', pbaText: 'File: {0}\nWriting takes up to a few minutes. Do not close the program or put the computer to sleep.',
    pbaDone: 'PBA image written.', pbaWriting: 'Writing the PBA image…',
    busy: 'Working…', ok: 'OK',
    cliMissing: 'sedutil-cli was not found next to the program ({0}). Reinstall the program.',
    e_NOT_AUTHORIZED: 'The drive did not take the password. Check:\n• the keyboard layout and Caps Lock (Show reveals what you typed);\n• the password hash at the top, now {0}: it must be the one the drive was set up with;\n• that it is the Admin1 password, not a range password.',
    e_AUTHORITY_LOCKED_OUT: 'Too many wrong passwords. Turn the computer off completely (not a restart) and try again.',
    e_IO_ERROR: 'The command did not reach the drive: no administrator rights, or an adapter that does not pass TCG commands.',
    e_NO_SESSIONS_AVAILABLE: 'The drive is busy with another session. Wait a minute or power it off.',
    e_SP_BUSY: 'The drive is busy. Try again in a moment.',
    e_COMMAND_ERROR: 'The drive does not support this, or is not a self-encrypting drive.',
    e_UNSUPPORTED_LOCKING_RANGE: 'There is no such range.',
    e_OPEN_FAILED: 'The image file did not open.',
    e_BAD_ARGUMENT: 'Wrong parameters.',
    e_GUI_ERROR: 'Program error: {0}',
    e_other: 'Failed: {0} (code {1}).',
    seeLog: 'Details are in the command log at the bottom.',
  },
  ru: {
    hashLabel: 'Хеш пароля', refresh: 'Обновить', drives: 'Диски', log: 'Журнал команд',
    copy: 'Копировать', copied: 'Скопировано', close: 'Закрыть',
    cancel: 'Отмена', scanning: 'Ищу диски…', noDrives: 'Диски не найдены.',
    pickDrive: 'Выберите диск слева.',
    st_noAccess: 'Нет доступа', st_notSed: 'Без TCG', st_notSetUp: 'Не настроен',
    st_locked: 'Заблокирован', st_unlocked: 'Разблокирован', systemDisk: 'Windows', diskN: 'Диск {0}',
    noAccessNote: 'Диск не открылся. Программе нужны права администратора, а некоторые USB-адаптеры прячут диск.',
    notSedNote: 'Диск не поддерживает TCG Opal: аппаратного шифрования, которым могла бы управлять программа, у него нет.',
    notSetUpNote: 'Шифрование на этом диске не включено. В этой версии настройка делается из командной строки:',
    lockedNote: 'Диск или его часть заблокированы: система не может читать эти данные, пока их не разблокировать.',
    mbrNote: 'Диск показывает системе PBA вместо данных (теневой MBR). Разблокировка здесь выключает это до следующего выключения питания.',
    noSerial: 'sedutil-cli не прочитал серийный номер диска. Он служит солью хеша пароля, поэтому пароли, заданные в PBA или в Linux, будут отвергнуты. Обновите программу; если не поможет, пришлите журнал команд.',
    systemNote: 'С этого диска работает Windows, поэтому блокировать его здесь нельзя: система сразу остановится.',
    f_path: 'Устройство', f_interface: 'Интерфейс', f_serial: 'Серийный номер', f_firmware: 'Прошивка',
    f_ssc: 'Стандарт', f_owner: 'Владелец (SID)', f_pba: 'PBA (теневой MBR)', f_block: 'Логический блок',
    f_size: 'Размер', f_letters: 'Тома',
    ownerFactory: 'заводской пароль (владелец не назначен)', ownerSet: 'назначен', on: 'включён', off: 'выключен',
    g_access: 'Доступ', g_setup: 'Настройка',
    a_unlock: 'Разблокировать', a_lock: 'Заблокировать', a_ranges: 'Показать диапазоны', a_password: 'Сменить пароль', a_pba: 'Записать образ PBA',
    d_unlock: 'До выключения питания', d_lock: 'Данные недоступны до разблокировки', d_ranges: 'Разделы со своими паролями',
    d_password: 'Пароль, который спрашивает PBA', d_pba: 'Экран, который виден при включении',
    admin1: 'Пароль Admin1', unlockTitle: 'Разблокировать диск',
    unlockText: 'Весь диск (глобальный диапазон) будет разблокирован до следующего выключения питания.',
    unlocked: 'Разблокирован. Если Windows ещё не видит разделы: Управление дисками → Действие → Повторить проверку дисков.',
    unlockedPartly: 'Диапазон всего диска открыт, но другие диапазоны ещё заблокированы. Откройте их в «Показать диапазоны».',
    lockTitle: 'Заблокировать диск',
    lockText: 'Данные всего диска сразу станут недоступны, пока вы снова его не разблокируете.',
    lockConfirm: 'С этого диска ничего не открыто, и я знаю его пароль.',
    locked: 'Заблокирован.',
    rangesTitle: 'Диапазоны блокировки', rangesText: 'Чтобы прочитать диапазоны, нужен пароль Admin1.',
    r_num: 'Диапазон', r_start: 'Начало', r_size: 'Размер', r_state: 'Состояние', r_own: 'Свой пароль',
    r_whole: 'весь диск', r_open: 'открыт', r_closed: 'заблокирован', r_ro: 'только чтение', r_off: 'блокировка выключена',
    r_tries: 'неверных попыток: {0} из {1}', r_triesNoLimit: 'неверных попыток: {0}', yes: 'да', no: 'нет',
    r_unlock: 'Открыть', r_lock: 'Закрыть', rangeTitle: 'Диапазон {0}',
    whichPw: 'Чей пароль', pwAdmin: 'Admin1', pwRange: 'диапазона',
    rangePw: 'Пароль', rangeDone: 'Диапазон {0}: готово.',
    pwTitle: 'Сменить пароль Admin1', oldPw: 'Текущий пароль', newPw: 'Новый пароль', newPw2: 'Новый пароль ещё раз',
    pwText: 'Этот пароль PBA спрашивает при включении. Пароль SID (владельца) не меняется.',
    pwMismatch: 'Новые пароли не совпадают.', pwEmpty: 'Введите пароль.',
    pwChanged: 'Пароль изменён. В PBA теперь вводите новый.',
    show: 'Показать', hide: 'Скрыть',
    capsOn: 'Включён Caps Lock.',
    nonLatin: 'В пароле есть не латинские буквы. Проверьте раскладку: PBA вводит пароль в английской (US) раскладке.',
    pbaTitle: 'Записать образ PBA', pbaText: 'Файл: {0}\nЗапись занимает до нескольких минут. Не закрывайте программу и не усыпляйте компьютер.',
    pbaDone: 'Образ PBA записан.', pbaWriting: 'Записываю образ PBA…',
    busy: 'Выполняю…', ok: 'OK',
    cliMissing: 'Рядом с программой не найден sedutil-cli ({0}). Переустановите программу.',
    e_NOT_AUTHORIZED: 'Диск не принял пароль. Проверьте:\n• раскладку и Caps Lock («Показать» покажет, что вы ввели);\n• хеш пароля вверху, сейчас {0}: он должен быть тем, с которым настраивали диск;\n• что это пароль Admin1, а не пароль диапазона.',
    e_AUTHORITY_LOCKED_OUT: 'Слишком много неверных паролей. Полностью выключите компьютер (не перезагрузка) и попробуйте снова.',
    e_IO_ERROR: 'Команда не дошла до диска: нет прав администратора или адаптер не пропускает команды TCG.',
    e_NO_SESSIONS_AVAILABLE: 'Диск занят другой сессией. Подождите минуту или выключите питание.',
    e_SP_BUSY: 'Диск занят. Попробуйте чуть позже.',
    e_COMMAND_ERROR: 'Диск это не поддерживает или не является самошифрующимся.',
    e_UNSUPPORTED_LOCKING_RANGE: 'Такого диапазона нет.',
    e_OPEN_FAILED: 'Не удалось открыть файл образа.',
    e_BAD_ARGUMENT: 'Неверные параметры.',
    e_GUI_ERROR: 'Ошибка программы: {0}',
    e_other: 'Не получилось: {0} (код {1}).',
    seeLog: 'Подробности в журнале команд внизу.',
  },
};
const LANG = (navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en';
document.documentElement.lang = LANG;

function t(key, ...args) {
  let s = TEXT[LANG][key] ?? TEXT.en[key] ?? key;
  args.forEach((a, i) => { s = s.split(`{${i}}`).join(String(a)); });
  return s;
}

/* window.__TAURI__ comes from Tauri (withGlobalTauri); dev/mock.js stands in for it in a browser */
const tauri = () => window.__TAURI__;
const $ = (id) => document.getElementById(id);

/* Build an element; text only through textContent */
function el(tag, props = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children) if (c != null) e.append(c);
  return e;
}

const state = {
  devices: [],
  disks: [],      // from Windows: {number, size, system, bus, letters}
  selected: null,
  ranges: {},     // path -> ranges of the last listing
  message: null,  // {kind: 'ok'|'err', text, path}
  scanned: false,
  log: [],        // newest first
};

/* ---------- running sedutil-cli ---------- */

function hashSetting() { return $('hash').value; }
function hashName() { return hashSetting() === 'sha512' ? 'SHA-512' : 'SHA-1'; }

/* quiet: a background refresh that keeps the log of the command before it */
async function cli(args, secrets = [], label = t('busy'), quiet = false) {
  showBusy(label);
  let r;
  try {
    r = await tauri().core.invoke('sedutil', { args, secrets, hash: hashSetting() });
  } catch (e) {
    r = { ok: false, code: -1, status: 'GUI_ERROR', errors: [String(e)], log: [] };
  } finally {
    secrets.fill('');
    hideBusy();
  }
  if (!quiet || !r.ok) addLog(args, r);
  return r;
}

function errorText(r) {
  if (r.status === 'GUI_ERROR') return t('e_GUI_ERROR', (r.errors || []).join(' '));
  if (r.status === 'NOT_AUTHORIZED') return t('e_NOT_AUTHORIZED', hashName());
  const key = 'e_' + r.status;
  if (TEXT.en[key]) return t(key);
  return t('e_other', r.status, r.code) + ' ' + t('seeLog');
}

function addLog(args, r) {
  const flags = ['-j'];
  if (args.includes('-')) flags.push('-S');
  if (hashSetting()) flags.push('-H', hashSetting());
  const time = new Date().toLocaleTimeString();
  const lines = [`[${time}] sedutil-cli ${[...flags, ...args].join(' ')}`, `  → ${r.status} (${r.code})`];
  for (const e of r.errors || []) lines.push('  error: ' + e);
  for (const l of r.log || []) if (!(r.errors || []).includes(l)) lines.push('  ' + l);
  state.log.unshift(lines.join('\n'));
  state.log.length = Math.min(state.log.length, 30);
  $('logText').textContent = state.log.join('\n\n');
  $('logStatus').textContent = '· ' + args[0] + ' → ' + r.status;
  $('logStatus').className = 'small ' + (r.ok ? 'muted' : 'error');
}

function showBusy(text) {
  $('busyText').textContent = text;
  $('progressWrap').hidden = true;
  $('progressText').textContent = '';
  $('busy').hidden = false;
}
function hideBusy() { $('busy').hidden = true; }
function showProgress(p) {
  $('progressWrap').hidden = false;
  $('progressBar').style.width = p.percent + '%';
  $('progressText').textContent = `${p.percent}% · ${(p.done / 1048576).toFixed(1)} / ${(p.total / 1048576).toFixed(1)} MiB`;
}

/* ---------- drive state ---------- */

function driveState(d) {
  if (!d.present) return { key: 'noAccess', cls: 'off' };
  if (!d.sed) return { key: 'notSed', cls: 'off' };
  if (!d.locking || !d.locking.enabled) return { key: 'notSetUp', cls: 'info' };
  if (d.locking.locked) return { key: 'locked', cls: 'warn' };
  return { key: 'unlocked', cls: 'ok' };
}

/* What Windows knows about the drive, matched by \\.\PhysicalDriveN */
function diskOf(d) {
  const m = /PhysicalDrive(\d+)$/i.exec(d.path || '');
  if (!m) return null;
  return state.disks.find((x) => x.number === Number(m[1])) || { number: Number(m[1]) };
}

function sizeOf(bytes) {
  if (!bytes) return '';
  const units = LANG === 'ru' ? ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'] : ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let v = bytes;
  while (v >= 1000 && i < units.length - 1) { v /= 1000; i++; }
  return (v >= 100 || i === 0 ? Math.round(v) : v.toFixed(1)) + ' ' + units[i];
}

function badge(d) {
  const s = driveState(d);
  return el('span', { class: 'badge ' + s.cls, text: t('st_' + s.key) });
}

function current() { return state.devices.find((d) => d.path === state.selected) || null; }

/* ---------- rendering ---------- */

function driveSubtitle(d) {
  const disk = diskOf(d);
  const parts = [];
  if (disk) parts.push(t('diskN', disk.number));
  if (d.interface) parts.push(d.interface);
  if (disk && disk.size) parts.push(sizeOf(disk.size));
  if (disk && disk.letters && disk.letters.length) parts.push(disk.letters.join(' '));
  return parts.join(' · ') || d.path;
}

function renderList() {
  const list = $('driveList');
  list.replaceChildren();
  for (const d of state.devices) {
    const disk = diskOf(d);
    const selected = d.path === state.selected;
    const item = el('li', {
      class: 'drive' + (selected ? ' selected' : ''),
      tabindex: '0', role: 'option', 'aria-selected': selected ? 'true' : 'false',
      onclick: () => select(d.path),
      onkeydown: (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); select(d.path); } },
    },
    el('div', { class: 'drive-model', text: d.model || d.path }),
    el('div', { class: 'drive-path', text: driveSubtitle(d) }),
    el('div', { class: 'drive-tags' }, badge(d),
      disk && disk.system ? el('span', { class: 'badge off', text: t('systemDisk') }) : null));
    list.append(item);
  }
  $('scanNote').textContent = state.scanned && !state.devices.length ? t('noDrives') : '';
}

function select(path) {
  state.selected = path;
  state.message = null;
  render();
}

function note(text, kind) {
  return el('p', { class: 'note' + (kind ? ' ' + kind : ''), text });
}

function banner(msg) {
  return el('div', { class: 'banner ' + (msg.kind === 'err' ? 'err' : 'ok'), role: msg.kind === 'err' ? 'alert' : 'status' },
    el('p', { text: msg.text }),
    el('button', {
      class: 'icon-btn', title: t('close'), 'aria-label': t('close'), text: '×',
      onclick: () => { state.message = null; renderDetail(); },
    }));
}

function fact(dl, label, value) {
  if (value == null || value === '') return;
  dl.append(el('dt', { text: label }), el('dd', { text: value }));
}

function action(label, desc, onclick, opts = {}) {
  return el('button', { class: 'action' + (opts.primary ? ' primary' : '') + (opts.danger ? ' danger' : ''), onclick, disabled: opts.disabled },
    el('span', { class: 'action-label', text: label }),
    el('span', { class: 'action-desc', text: desc }));
}

function renderDetail() {
  const box = $('detail');
  box.replaceChildren();
  const d = current();
  if (!d) {
    box.append(el('p', { class: 'empty', text: state.scanned ? t('pickDrive') : t('scanning') }));
    return;
  }
  const s = driveState(d);
  const disk = diskOf(d);
  const system = !!(disk && disk.system);
  box.append(el('div', { class: 'detail-head' },
    el('div', {}, el('h2', { text: d.model || d.path }), el('div', { class: 'muted small', text: driveSubtitle(d) })),
    badge(d)));

  if (state.message && state.message.path === d.path) box.append(banner(state.message));

  if (s.key === 'noAccess') box.append(note(t('noAccessNote'), 'warn'));
  if (s.key === 'notSed') box.append(note(t('notSedNote')));
  if (s.key === 'notSetUp') {
    box.append(el('div', { class: 'note' }, el('p', { text: t('notSetUpNote') }),
      el('code', { class: 'cmd', text: 'sedutil-cli -S --initialSetup - ' + d.path })));
  }
  if (d.sed && !d.serial) box.append(note(t('noSerial'), 'warn'));
  if (s.key === 'locked') box.append(note(t('lockedNote'), 'warn'));
  if (d.locking && d.locking.enabled && d.locking.mbrEnabled && !d.locking.mbrDone) box.append(note(t('mbrNote')));

  if (s.key === 'locked' || s.key === 'unlocked') {
    box.append(el('h3', { text: t('g_access') }));
    const access = el('div', { class: 'actions' });
    access.append(action(t('a_unlock'), t('d_unlock'), () => unlockDrive(d), { primary: s.key === 'locked' }));
    access.append(action(t('a_ranges'), t('d_ranges'), () => listRanges(d)));
    if (!system) access.append(action(t('a_lock'), t('d_lock'), () => lockDrive(d), { danger: true }));
    box.append(access);
    if (system) box.append(note(t('systemNote'), 'quiet'));
    if (state.ranges[d.path]) box.append(rangesTable(d, state.ranges[d.path], system));

    box.append(el('h3', { text: t('g_setup') }));
    box.append(el('div', { class: 'actions' },
      action(t('a_password'), t('d_password'), () => changePassword(d)),
      action(t('a_pba'), t('d_pba'), () => writePba(d))));
  }

  if (d.present) {
    const dl = el('dl', { class: 'facts' });
    fact(dl, t('f_path'), d.path);
    if (disk && disk.size) fact(dl, t('f_size'), sizeOf(disk.size));
    if (disk && disk.letters && disk.letters.length) fact(dl, t('f_letters'), disk.letters.join(', '));
    fact(dl, t('f_interface'), d.interface);
    fact(dl, t('f_serial'), d.serial);
    fact(dl, t('f_firmware'), d.firmware);
    if (d.ssc && d.ssc.length) fact(dl, t('f_ssc'), d.ssc.map((x) => ({ opal2: 'Opal 2.0', opal1: 'Opal 1.0', enterprise: 'Enterprise' }[x] || x)).join(', '));
    if (d.blockSid) fact(dl, t('f_owner'), d.blockSid.sidIsMsid ? t('ownerFactory') : t('ownerSet'));
    if (d.locking && d.locking.enabled) fact(dl, t('f_pba'), d.locking.mbrEnabled ? t('on') : t('off'));
    if (d.geometry) fact(dl, t('f_block'), d.geometry.logicalBlockSize + ' B');
    box.append(dl);
  }
}

function sizeText(blocks, d) {
  return sizeOf(blocks * ((d.geometry && d.geometry.logicalBlockSize) || 512));
}

function rangeState(r) {
  if (!r.readLockEnabled && !r.writeLockEnabled) return t('r_off');
  if (r.readLocked && r.writeLocked) return t('r_closed');
  if (r.writeLocked) return t('r_ro');
  return t('r_open');
}

function rangesTable(d, ranges, system) {
  const body = el('tbody');
  for (const r of ranges) {
    const whole = r.range === 0;
    let own = r.ownPassword ? t('yes') : t('no');
    if (r.ownPassword) own += ' · ' + (r.tryLimit ? t('r_tries', r.tries, r.tryLimit) : t('r_triesNoLimit', r.tries));
    const locked = r.readLocked || r.writeLocked;
    // closing the whole-drive range of the system disk would stop Windows
    const button = locked || !(system && whole)
      ? el('button', { class: 'btn small-btn', text: locked ? t('r_unlock') : t('r_lock'), onclick: () => setRange(d, r, !locked) })
      : null;
    body.append(el('tr', {},
      el('td', { text: String(r.range) }),
      el('td', { text: whole ? t('r_whole') : String(r.start) }),
      el('td', { text: whole ? '' : sizeText(r.length, d) }),
      el('td', { text: rangeState(r) }),
      el('td', { text: whole ? '' : own }),
      el('td', {}, button)));
  }
  return el('div', { class: 'ranges' },
    el('table', {},
      el('thead', {}, el('tr', {},
        el('th', { text: t('r_num') }), el('th', { text: t('r_start') }), el('th', { text: t('r_size') }),
        el('th', { text: t('r_state') }), el('th', { text: t('r_own') }), el('th', {}))),
      body));
}

function render() { renderList(); renderDetail(); }

/* ---------- dialog ---------- */

/* A password input with Show/Hide and live hints for Caps Lock and a
 * non-Latin layout: the usual reasons a right password is refused. */
function passwordField(f) {
  const input = el('input', { id: 'f_' + f.id, type: 'password', autocomplete: 'off', spellcheck: 'false', autocapitalize: 'off' });
  const toggle = el('button', { type: 'button', class: 'btn ghost', text: t('show') });
  toggle.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.textContent = show ? t('hide') : t('show');
    input.focus();
  });
  const hint = el('div', { class: 'hint', 'aria-live': 'polite' });
  let caps = false;
  const update = () => {
    const msgs = [];
    if (caps) msgs.push(t('capsOn'));
    if (/[^\x20-\x7e]/.test(input.value)) msgs.push(t('nonLatin'));
    hint.textContent = msgs.join(' ');
    hint.hidden = !msgs.length;
  };
  const onKey = (ev) => {
    if (ev.getModifierState) caps = ev.getModifierState('CapsLock');
    update();
  };
  input.addEventListener('keydown', onKey);
  input.addEventListener('keyup', onKey);
  input.addEventListener('input', update);
  update();
  return { input, node: el('label', { class: 'field' }, el('span', { text: f.label }), el('div', { class: 'pw-row' }, input, toggle), hint) };
}

/* fields: [{id, label, type: 'password'|'text'|'select', options}], confirm: checkbox text.
 * Resolves to {id: value} or null. validate(values) returns an error text or null. */
function ask({ title, text, fields = [], ok, danger, confirm, validate }) {
  return new Promise((resolve) => {
    const dlg = $('dialog');
    $('dialogTitle').textContent = title;
    $('dialogText').textContent = text || '';
    $('dialogText').hidden = !text;
    $('dialogError').hidden = true;
    const box = $('dialogFields');
    box.replaceChildren();
    const inputs = {};
    for (const f of fields) {
      if (f.type === 'select') {
        const input = el('select', { id: 'f_' + f.id });
        for (const [v, label] of f.options) input.append(el('option', { value: v, text: label }));
        inputs[f.id] = input;
        box.append(el('label', { class: 'field' }, el('span', { text: f.label }), input));
      } else {
        const p = passwordField(f);
        inputs[f.id] = p.input;
        box.append(p.node);
      }
    }
    let check = null;
    if (confirm) {
      check = el('input', { type: 'checkbox' });
      box.append(el('label', { class: 'check' }, check, el('span', { text: confirm })));
    }
    const okBtn = $('dialogOk');
    okBtn.textContent = ok || t('ok');
    okBtn.className = 'btn primary' + (danger ? ' danger' : '');
    const sync = () => { okBtn.disabled = !!check && !check.checked; };
    if (check) check.addEventListener('change', sync);
    sync();

    const finish = (values) => {
      for (const i of Object.values(inputs)) i.value = '';
      $('dialogForm').onsubmit = null;
      $('dialogCancel').onclick = null;
      dlg.onclose = null;
      if (dlg.open) dlg.close();
      resolve(values);
    };
    $('dialogForm').onsubmit = (ev) => {
      ev.preventDefault();
      const values = {};
      for (const [id, i] of Object.entries(inputs)) values[id] = i.value;
      for (const f of fields) {
        if (f.type !== 'select' && !values[f.id]) return showDialogError(t('pwEmpty'));
      }
      const err = validate ? validate(values) : null;
      if (err) return showDialogError(err);
      finish(values);
    };
    $('dialogCancel').onclick = () => finish(null);
    dlg.onclose = () => finish(null);
    dlg.showModal();
    const first = Object.values(inputs).find((i) => i.tagName === 'INPUT');
    if (first) first.focus();
  });
}

function showDialogError(text) {
  $('dialogError').textContent = text;
  $('dialogError').hidden = false;
}

/* ---------- actions ---------- */

function report(d, r, okText) {
  state.message = { path: d.path, kind: r.ok ? 'ok' : 'err', text: r.ok ? okText : errorText(r) };
}

async function refreshDrive(d) {
  const r = await cli(['--query', d.path], [], t('busy'), true);
  if (r.ok && r.device) {
    const i = state.devices.findIndex((x) => x.path === d.path);
    if (i >= 0) state.devices[i] = r.device;
  }
}

async function unlockDrive(d) {
  const v = await ask({ title: t('unlockTitle'), text: t('unlockText'), fields: [{ id: 'pw', label: t('admin1') }], ok: t('a_unlock') });
  if (!v) return;
  let r = await cli(['--setLockingRange', '0', 'RW', '-', d.path], [v.pw]);
  if (r.ok && d.locking.mbrEnabled) r = await cli(['--setMBRDone', 'on', '-', d.path], [v.pw]);
  v.pw = '';
  report(d, r, t('unlocked'));
  await refreshDrive(d);
  // Discovery says "locked" while any range is: those with own passwords stay closed
  const now = current();
  if (r.ok && now && now.locking && now.locking.locked) report(d, r, t('unlockedPartly'));
  render();
}

async function lockDrive(d) {
  const disk = diskOf(d);
  if (disk && disk.system) return;
  const v = await ask({
    title: t('lockTitle'), text: t('lockText'), fields: [{ id: 'pw', label: t('admin1') }],
    ok: t('a_lock'), danger: true, confirm: t('lockConfirm'),
  });
  if (!v) return;
  const r = await cli(['--setLockingRange', '0', 'LK', '-', d.path], [v.pw]);
  v.pw = '';
  report(d, r, t('locked'));
  delete state.ranges[d.path];
  await refreshDrive(d);
  render();
}

async function listRanges(d) {
  const v = await ask({ title: t('rangesTitle'), text: t('rangesText'), fields: [{ id: 'pw', label: t('admin1') }], ok: t('a_ranges') });
  if (!v) return;
  const r = await cli(['--listLockingRanges', '-', d.path], [v.pw]);
  v.pw = '';
  if (r.ok) { state.ranges[d.path] = r.ranges || []; state.message = null; } else report(d, r);
  render();
}

async function setRange(d, range, lock) {
  const fields = [];
  if (range.ownPassword) fields.push({ id: 'who', label: t('whichPw'), type: 'select', options: [['range', t('pwRange')], ['admin', t('pwAdmin')]] });
  fields.push({ id: 'pw', label: range.ownPassword ? t('rangePw') : t('admin1') });
  const v = await ask({
    title: t('rangeTitle', range.range), fields,
    ok: lock ? t('r_lock') : t('r_unlock'), danger: lock,
    confirm: lock ? t('lockConfirm') : null,
  });
  if (!v) return;
  const cmd = v.who === 'range' ? '--setLockingRangeUser' : '--setLockingRange';
  const r = await cli([cmd, String(range.range), lock ? 'LK' : 'RW', '-', d.path], [v.pw]);
  v.pw = '';
  report(d, r, t('rangeDone', range.range));
  if (r.ok) {
    range.readLocked = lock && range.readLockEnabled;
    range.writeLocked = lock && range.writeLockEnabled;
  }
  await refreshDrive(d);
  render();
}

async function changePassword(d) {
  const v = await ask({
    title: t('pwTitle'), text: t('pwText'),
    fields: [{ id: 'old', label: t('oldPw') }, { id: 'pw', label: t('newPw') }, { id: 'pw2', label: t('newPw2') }],
    ok: t('a_password'),
    validate: (x) => (x.pw !== x.pw2 ? t('pwMismatch') : null),
  });
  if (!v) return;
  const r = await cli(['--setAdmin1Pwd', '-', '-', d.path], [v.old, v.pw]);
  v.old = v.pw = v.pw2 = '';
  report(d, r, t('pwChanged'));
  render();
}

async function writePba(d) {
  const file = await tauri().core.invoke('pick_image');
  if (!file) return;
  const v = await ask({ title: t('pbaTitle'), text: t('pbaText', file), fields: [{ id: 'pw', label: t('admin1') }], ok: t('a_pba') });
  if (!v) return;
  const unlisten = await tauri().event.listen('sedutil-progress', (e) => showProgress(e.payload));
  let r;
  try {
    r = await cli(['--loadPBAimage', '-', file, d.path], [v.pw], t('pbaWriting'));
  } finally {
    unlisten();
  }
  v.pw = '';
  report(d, r, t('pbaDone'));
  render();
}

async function scan() {
  state.scanned = false;
  render();
  const [r, disks] = await Promise.all([
    cli(['--scan'], [], t('scanning')),
    tauri().core.invoke('disk_map').catch(() => []),
  ]);
  state.disks = Array.isArray(disks) ? disks : [];
  state.scanned = true;
  state.devices = r.ok ? r.devices || [] : [];
  if (!state.devices.some((d) => d.path === state.selected)) {
    // start on a drive the program can do something with
    const first = state.devices.find((d) => d.locking && d.locking.locked)
      || state.devices.find((d) => d.locking && d.locking.enabled)
      || state.devices.find((d) => d.sed) || state.devices[0];
    state.selected = first ? first.path : null;
  }
  render();
  if (!r.ok) $('detail').prepend(note(errorText(r), 'warn'));
}

/* ---------- start ---------- */

function applyText() {
  for (const e of document.querySelectorAll('[data-t]')) e.textContent = t(e.dataset.t);
}

async function start() {
  applyText();
  try { $('hash').value = localStorage.getItem('hash') || ''; } catch (e) { /* no storage */ }
  $('hash').addEventListener('change', () => {
    try { localStorage.setItem('hash', $('hash').value); } catch (e) { /* no storage */ }
  });
  $('refresh').addEventListener('click', scan);
  $('copyLog').addEventListener('click', async (ev) => {
    ev.preventDefault();
    try {
      await navigator.clipboard.writeText($('logText').textContent);
      $('copyLog').textContent = t('copied');
      setTimeout(() => { $('copyLog').textContent = t('copy'); }, 1500);
    } catch (e) { /* no clipboard */ }
  });
  // F5 and Ctrl+R would reload the page and lose the state: rescan instead
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'F5' || ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'r')) {
      ev.preventDefault();
      if ($('busy').hidden && !$('dialog').open) scan();
    }
  });
  const info = await tauri().core.invoke('cli_info');
  if (!info.found) {
    state.scanned = true;
    render();
    $('detail').prepend(note(t('cliMissing', info.path || '?'), 'warn'));
    return;
  }
  await scan();
}

if (window.__TAURI__) start();
else {
  // opened as a plain page: load the stand-in backend (not part of the app)
  const mock = document.createElement('script');
  mock.src = '../dev/mock.js';
  mock.onload = start;
  document.head.append(mock);
}
