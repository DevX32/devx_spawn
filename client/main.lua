local camZPlus1 = 1000
local camZPlus2 = 50
local pointCamCoords = 75
local pointCamCoords2 = 0
local cam1Time = 500
local cam2Time = 1000
local LastLocation = nil
local CoreName, CoreObject
local Locations = require('shared.locations')

if GetResourceState('qb-core') == 'started' then
    CoreName = 'qb'
    CoreObject = exports['qb-core']:GetCoreObject()
elseif GetResourceState('es_extended') == 'started' then
    CoreName = 'esx'
    TriggerEvent('esx:getSharedObject', function(obj) CoreObject = obj end)
else
    print("No core framework detected")
    return
end

function GetPlayerData()
    if CoreName == 'qb' then
        return CoreObject.Functions.GetPlayerData()
    elseif CoreName == 'esx' then
        return CoreObject.GetPlayerData()
    else
        return nil
    end
end

function ToggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

RegisterNetEvent('devx_spawn:client:openUI', function()
    DoScreenFadeOut(250)
    Wait(1000)
    DoScreenFadeIn(250)
    ToggleNuiFrame(true)
    SendReactMessage('setLocations', Locations)
    local playerData = GetPlayerData()
    if playerData then
        LastLocation = vector3(playerData.position.x, playerData.position.y, playerData.position.z)
    end
    local camera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", -206.19, -1013.78, 30.13 + camZPlus1, -85.00, 0.00, 0.00, 100.00, false, 0)
    SetCamActive(camera, true)
    RenderScriptCams(true, false, 1, true, true)
end)

RegisterNUICallback('hideFrame', function(_, cb)
    ToggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)

RegisterNUICallback('spawnCharacter', function(data, cb)
    local camPos
    local playerData = GetPlayerData()
    if data.label == 'Last Location' then
        if LastLocation then
            camPos = { x = playerData.position.x, y = playerData.position.y, z = playerData.position.z }
        else
            camPos = { x = -206.19, y = -1013.78, z = 30.13 }
        end
    else
        camPos = { x = data.x, y = data.y, z = data.z }
    end
    ToggleNuiFrame(false)
    FreezeEntityPosition(PlayerPedId(), true)
    SetEntityVisible(PlayerId(), false, 0)
    SetCam(camPos)
    FreezeEntityPosition(PlayerPedId(), false)
end)

local cloudOpacity = 0.01
local muteSound = true

function ToggleSound(state)
    if state then
        StartAudioScene("MP_LEADERBOARD_SCENE");
    else
        StopAudioScene("MP_LEADERBOARD_SCENE");
    end
end

function ClearScreen()
    SetCloudHatOpacity(cloudOpacity)
    SetDrawOrigin(0.0, 0.0, 0.0, 0)
end

function InitialSetup()
    ToggleSound(muteSound)
    SwitchOutPlayer(PlayerPedId(), 0, 1)
end

function SetCam(campos)
    local cam2 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", campos.x, campos.y, campos.z + camZPlus1, 300.00,0.00,0.00, 110.00, false, 0)
    PointCamAtCoord(cam2, campos.x, campos.y, campos.z + pointCamCoords)
    SetCamActiveWithInterp(cam2, cam, cam1Time, true, true)
    if DoesCamExist(cam) then
        DestroyCam(cam, true)
    end
    Wait(cam1Time)
    local cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", campos.x, campos.y, campos.z + camZPlus2, 300.00,0.00,0.00, 110.00, false, 0)
    PointCamAtCoord(cam, campos.x, campos.y, campos.z + pointCamCoords2)
    SetCamActiveWithInterp(cam, cam2, cam2Time, true, true)
    SetEntityCoords(PlayerPedId(), campos.x, campos.y, campos.z)
    DoScreenFadeOut(500)
    Wait(2000)
    FreezeEntityPosition(ped, false)
    RenderScriptCams(false, true, 500, true, true)
    SetCamActive(cam, false)
    DestroyCam(cam, true)
    SetCamActive(cam2, false)
    DestroyCam(cam2, true)
    SetEntityVisible(PlayerPedId(), true)
    Wait(500)
    DoScreenFadeIn(250)
end

function GetTime()
    local hour = GetClockHours()
    local minute = GetClockMinutes()
    local ampm = "AM"
    if hour >= 12 then
        ampm = "PM"
        if hour > 12 then
            hour = hour - 12
        end
    end
    return string.format("%02d:%02d %s", hour, minute, ampm)
end

function GetWeatherInfo()
    local weatherId = GetPrevWeatherTypeHashName()
    local weatherName = "Unknown"
    local temperature = 0
    if weatherId == 916995460 then
        weatherName = "Clear"
        temperature = 24
    elseif weatherId == -1750463879 then
        weatherName = "Extra Sunny"
        temperature = 35
    elseif weatherId == 821931868 then
        weatherName = "Clouds"
        temperature = 16
    elseif weatherId == -1148613331 then
        weatherName = "Overcast"
        temperature = 11
    elseif weatherId == 1420204096 then
        weatherName = "Rain"
        temperature = 9
    elseif weatherId == -1233681761 then
        weatherName = "Thunderstorm"
        temperature = 5
    elseif weatherId == 1840358669 then
        weatherName = "Clearing"
        temperature = 12
    elseif weatherId == -1429616491 then
        weatherName = "Snow"
        temperature = -2
    elseif weatherId == 669657108 then
        weatherName = "Blizzard"
        temperature = -7
    elseif weatherId == 603685163 then
        weatherName = "Light Snow"
        temperature = -4
    end
    return weatherName, temperature
end

RegisterNetEvent('receiveData', function(dateString)
    local weather, temp = GetWeatherInfo()
    local info = {
        time = GetTime(),
        date = dateString,
        weather = weather,
        temp = temp,
        wind = math.floor(GetWindSpeed() + 0.5),
    }
    SendReactMessage('updateInfo', info)
end)

CreateThread(function()
    while true do
        TriggerServerEvent('sendData')
        Wait(1000)
    end
end)