export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Dekbedden',
    href: '/dekbedden/',
    children: [
      { label: 'Dekbed', href: '/beste-dekbed/' },
      { label: 'Tencel dekbed', href: '/beste-tencel-dekbed/' },
      { label: 'Dekbedovertrek kind', href: '/beste-dekbedovertrek-kind/' },
      { label: 'Fluffy dekbedovertrek', href: '/beste-fluffy-dekbedovertrek/' },
      { label: 'Luxe dekbedovertrekken', href: '/beste-luxe-dekbedovertrekken/' },
      { label: 'Dekbedovertrek 160×200', href: '/beste-dekbedovertrek-160x200/' },
      { label: 'Dekbedovertrek 240×220', href: '/beste-dekbedovertrek-240x220/' },
      { label: 'Katoenen dekbedovertrek', href: '/beste-katoenen-dekbedovertrek/' },
      { label: '4 seizoenen dekbed 240×220', href: '/beste-4-seizoenen-dekbed-240x220/' },
      { label: 'Katoen satijn dekbedovertrek', href: '/beste-katoen-satijn-dekbedovertrek/' },
    ],
  },
  {
    label: 'Huishouden',
    href: '/huishouden/',
    children: [
      { label: 'Strijkijzer', href: '/beste-strijkijzer/' },
      { label: 'Droogrek', href: '/beste-droogrek/' },
      { label: 'Dweilrobot', href: '/beste-dweilrobot/' },
      { label: 'Condensdroger', href: '/beste-condensdroger/' },
      { label: 'Droogrek hangend', href: '/beste-droogrek-hangend/' },
      { label: 'Wasmachine 10 kg', href: '/beste-wasmachine-10-kg/' },
      { label: 'Elektrisch droogrek', href: '/beste-elektrisch-droogrek/' },
      { label: 'Stoomreiniger bank', href: '/beste-stoomreiniger-bank/' },
      { label: 'Stoomreiniger kleding', href: '/beste-stoomreiniger-kleding/' },
      { label: 'Tussenstuk wasmachine droger', href: '/beste-tussenstuk-wasmachine-droger/' },
    ],
  },
  { label: 'Blogoverzicht', href: '/blogoverzicht/' },
  { label: 'Over ons', href: '/over-ons/' },
  { label: 'Contact', href: '/contact/' },
];
