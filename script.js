const courses = [
  {
    mark: 'R&S',
    level: 'Curso Técnico Terciario',
    title: 'Tecnicatura en Redes y Software',
    description: 'Diseñá, desplegá y administrá soluciones de software y redes para organizaciones reales.',
    requirement: 'Bachillerato Tecnológico o Secundaria culminados. El plan publicado por ITS contempla también trayectos informáticos previos específicos sin previas.',
    tags: ['Redes', 'Software', 'Infraestructura'],
    brochure: 'https://its.utu.edu.uy/wp-content/uploads/2023/12/CTT-informatica.pdf'
  },
  {
    mark: 'BT',
    level: 'Bachillerato Tecnológico',
    title: 'Tecnologías de la Información',
    description: 'Una formación integral para entender la tecnología y empezar a crear con ella.',
    requirement: 'Educación Media Básica aprobada, en sus distintas modalidades; incluye Ciclo Básico, CBT, FPB con orientación afín o acreditación equivalente.',
    tags: ['Programación', 'Web', 'Datos'],
    brochure: 'https://its.utu.edu.uy/wp-content/uploads/2024/12/Folleto-BT-informatica.pdf'
  },
  {
    mark: 'FN',
    level: 'Finalización de Educación Media Tecnológica',
    title: 'FINEST · IT y Redes',
    description: 'Completá el bachillerato con una orientación técnica en tecnologías de la información y redes.',
    requirement: 'Tener aprobado al menos el 50% de las asignaturas de Educación Media Superior, en cualquier orientación de Secundaria o UTU. Si ya egresaste de EMS, cursás únicamente el componente tecnológico.',
    tags: ['IT', 'Redes', 'Bachillerato'],
    brochure: 'https://its.utu.edu.uy/wp-content/uploads/2023/12/FINEST-informatica.pdf'
  },
  {
    mark: 'BTP',
    level: 'Bachillerato Técnico Profesional',
    title: 'Soporte Técnico Informático',
    description: 'Aprendé a diagnosticar, mantener y hacer funcionar el mundo digital.',
    requirement: 'Educación Media Básica aprobada en cualquiera de sus modalidades. La formación tiene tres años de duración y combina laboratorio, soporte, redes y desarrollo web.',
    tags: ['Hardware', 'Soporte', 'Servicios'],
    brochure: 'https://its.utu.edu.uy/wp-content/uploads/2024/12/Folleto-BTP-informatica.pdf'
  }
];

const dialog = document.querySelector('#course-dialog');
const dialogMark = document.querySelector('#dialog-mark');
const dialogLevel = document.querySelector('#dialog-level');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const dialogRequirement = document.querySelector('#dialog-requirement');
const dialogTags = document.querySelector('#dialog-tags');
const dialogLink = document.querySelector('#dialog-link');

function openCourse(index) {
  const course = courses[index];
  if (!course) return;

  dialogMark.textContent = course.mark;
  dialogLevel.textContent = course.level;
  dialogTitle.textContent = course.title;
  dialogDescription.textContent = course.description;
  dialogRequirement.textContent = course.requirement;
  dialogTags.replaceChildren(...course.tags.map((tag) => {
    const item = document.createElement('span');
    item.textContent = tag;
    return item;
  }));
  dialogLink.href = course.brochure;
  dialog.showModal();
}

document.querySelectorAll('[data-course]').forEach((button) => {
  button.addEventListener('click', () => openCourse(Number(button.dataset.course)));
});

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const menuButton = document.querySelector('#menu-button');
const navLinks = document.querySelector('#nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
