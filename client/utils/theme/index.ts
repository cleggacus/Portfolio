import dark from './dark.json';
import light from './light.json';

enum Theme {
  Light,
  Dark
}

const defaultTheme = Theme.Light

const loadTheme = (theme: any) => {
  for (const [key, value] of Object.entries(theme)) {
    if (key && typeof value == "string") {
      document.documentElement.style.setProperty("--" + key, value);
    }
  }
}

const themeIsValid = (theme: Theme) =>
  !isNaN(theme) || theme >= 0 || theme < Object.keys(Theme).length;

const setLocalTheme = (theme: Theme = -1) => {
  if (!themeIsValid(theme)) {
    getLocalTheme();
    return;
  }

  localStorage.setItem('currentTheme', theme.toString());

  switch (theme) {
    case Theme.Light:
      loadTheme(light);
      break;
    case Theme.Dark:
      loadTheme(dark);
      break
    default:
      loadTheme(dark);
      break;
  }
}

const getLocalTheme = (): Theme => {
  const currentTheme = localStorage.getItem("currentTheme");
  const currentThemeInt = currentTheme ? parseInt(currentTheme) : -1;

  if (themeIsValid(currentThemeInt)) {
    setLocalTheme(defaultTheme);
    return defaultTheme;
  }

  return currentThemeInt;
}

export {
  getLocalTheme,
  setLocalTheme,
  themeIsValid,
  loadTheme,
  defaultTheme
}

export default Theme