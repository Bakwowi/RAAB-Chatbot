document.addEventListener("DOMContentLoaded", () => {
    const saveTheme = localStorage.getItem("theme");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let theme;
    if (saveTheme) {
        // If a theme is stored in localStorage
        if (saveTheme === "system") {
            // If stored theme is "system", use system preference
            theme = prefersDarkScheme ? "dark" : "light";
        } else {
            // If stored theme is "light" or "dark"
            const systemTheme = prefersDarkScheme ? "dark" : "light";
            if (saveTheme === systemTheme) {
                // If stored theme matches system theme, use it
                theme = saveTheme;
            } else {
                // If stored theme differs from system, use stored theme
                theme = saveTheme;
            }
        }
    } else {
        // No theme stored, use system preference
        theme = prefersDarkScheme ? "dark" : "light";
    }
    setTheme(theme);
});

const setTheme = (theme) => {
    if(theme === "light"){
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark-theme");
    }
    else if(theme === "dark"){
        document.documentElement.classList.add("dark-theme");
        document.documentElement.classList.remove("light-theme");
    }
    else if(theme === "system"){
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        console.log("System theme detected. Prefers dark scheme:", prefersDarkScheme);
        if(prefersDarkScheme){
            document.documentElement.classList.add("dark-theme");
            document.documentElement.classList.remove("light-theme");
        } else {
            document.documentElement.classList.add("light-theme");
            document.documentElement.classList.remove("dark-theme");
        }
    }
    else {
        console.error("Invalid theme specified:", theme);
    }
};

export default setTheme;