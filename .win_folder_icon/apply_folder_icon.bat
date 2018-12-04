@echo off

goto check_permissions

:check_permissions
    echo Administrative permissions required. Detecting permissions...

    net session >nul 2>&1
    if %errorLevel% == 0 (
        echo Success: Administrative permissions confirmed.
        goto script
    ) else (
        echo Failure: Current permissions inadequate.
        echo Run this script as Administrator and try again.
        goto end
    )

:script
	echo Applying custom folder icon...
	cd %~dp0
    cd ..

    :: Delete any existing desktop.ini, otherwise the copy step will fail.
    del /A S /F desktop.ini

    :: Copy our desktop.ini and set the required "system" and "hidden" attributes on it.
    copy /V ".win_folder_icon\desktop.ini" "desktop.ini"
    attrib +s +h -a desktop.ini

    :: Strangely, the folder also has to be set to read-only for its icon to show up.
    attrib +r .

    echo Success!
    echo You may need to restart Explorer from your Task Manager to see the new icon.
    goto end

:end
	pause
