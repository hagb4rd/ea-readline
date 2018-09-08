@echo off & setlocal EnableDelayedExpansion
set shelldir=%~dp0

if "%2"=="" (
	if "%1"=="" (
		goto :Help
	) else (
		call :list %1
		goto :Remap
	)
) 
goto :Start


:Help
echo.
Echo ****************** lsmap.cmd **********************
Echo *
Echo * USAGE 
Echo *
Echo *  lsmap.cmd [DIRECTORY] GLOB [GLOB2] .. [GLOB5]
Echo *
Echo * EXAMPLE
Echo *
Echo *  lsmap F:\videos\porn *.mp4
Echo *
Echo ***************************************************
goto :Done

:Start
pushd %1
call :list %2
call :list %3
call :list %4
call :list %5
call :list %6
popd %1
goto :Remap


:Remap
if EXIST %shelldir%temp (
  readline %shelldir%temp --remap | tojson 2>> %shelldir%errors
  rm %shelldir%temp
) else (
  Echo []
)
goto :Done


:list
if NOT "%1"=="" (
	dir %1 /s/b >> %shelldir%temp 2>> %shelldir%errors
)
goto :eof


:Done
endlocal