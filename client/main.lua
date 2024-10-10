local CAM_Z_OFFSET_1 = 1000
local CAM_Z_OFFSET_2 = 50
local CAM_POINT_OFFSET_1 = 75
local CAM_POINT_OFFSET_2 = 0
local CAM_TRANSITION_TIME_1 = 500
local CAM_TRANSITION_TIME_2 = 1000
local CLOUD_OPACITY = 0.01
local MUTE_SOUND = true
local LAST_LOCATION = nil
local locales = require("locale.locales")
local locale = locales[Config.Locale] or locales.en

if Config.Framework == "qb-core" then
    QBCore = exports[Config.Framework]:GetCoreObject()
elseif Config.Framework == "esx" then
    ESX = exports.es_extended:getSharedObject()
end

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

local function toggleSound(state)
    if state then
        StartAudioScene("MP_LEADERBOARD_SCENE")
    else
        StopAudioScene("MP_LEADERBOARD_SCENE")
    end
end

local function clearScreen()
    SetCloudHatOpacity(CLOUD_OPACITY)
    SetDrawOrigin(0.0, 0.0, 0.0, 0)
end

local function initialSetup()
    toggleSound(MUTE_SOUND)
    SwitchOutPlayer(PlayerPedId(), 0, 1)
end

local function setupCameraTransition(campos)
    local cam1 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", campos.x, campos.y, campos.z + CAM_Z_OFFSET_1, 300.00, 0.00, 0.00, 110.00, false, 0)
    local cam2 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", campos.x, campos.y, campos.z + CAM_Z_OFFSET_2, 300.00, 0.00, 0.00, 110.00, false, 0)
    PointCamAtCoord(cam1, campos.x, campos.y, campos.z + CAM_POINT_OFFSET_1)
    SetCamActiveWithInterp(cam1, cam2, CAM_TRANSITION_TIME_1, true, true)
    if DoesCamExist(cam2) then
        DestroyCam(cam2, true)
    end
    Wait(CAM_TRANSITION_TIME_1)
    PointCamAtCoord(cam2, campos.x, campos.y, campos.z + CAM_POINT_OFFSET_2)
    SetCamActiveWithInterp(cam2, cam2, CAM_TRANSITION_TIME_2, true, true)
    SetEntityCoords(PlayerPedId(), campos.x, campos.y, campos.z)
    DoScreenFadeOut(500)
    Wait(2000)
    FreezeEntityPosition(PlayerPedId(), false)
    RenderScriptCams(false, true, 500, true, true)
    SetCamActive(cam1, false)
    DestroyCam(cam1, true)
    SetCamActive(cam2, false)
    DestroyCam(cam2, true)
    SetEntityVisible(PlayerPedId(), true)
    Wait(500)
    DoScreenFadeIn(250)
end

RegisterNetEvent('devx_spawn:initInterface', function()
    DoScreenFadeOut(250)
    Wait(1000)
    DoScreenFadeIn(250)
    toggleNuiFrame(true)
    SendReactMessage('setLocations', Config.Locations)
    if Config.Framework == "qb-core" then
        PlayerData = QBCore.Functions.GetPlayerData()
    elseif Config.Framework == "esx" then
        PlayerData = ESX.GetPlayerData()
    end
    if PlayerData then
        LAST_LOCATION = vec3(PlayerData.position.x, PlayerData.position.y, PlayerData.position.z)
    end
    local camera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", -206.19, -1013.78, 30.13 + CAM_Z_OFFSET_1, -85.00, 0.00, 0.00, 100.00, false, 0)
    SetCamActive(camera, true)
    RenderScriptCams(true, false, 1, true, true)
end)

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    cb({})
end)

RegisterNUICallback('spawnCharacter', function(data)
    local camPos
    if Config.Framework == "qb-core" then
        PlayerData = QBCore.Functions.GetPlayerData()
    elseif Config.Framework == "esx" then
        PlayerData = ESX.GetPlayerData()
    end
    local isDead = IsEntityDead(PlayerPedId())
    if isDead and Config.ForceLastLocation then
        if LAST_LOCATION then
            camPos = { x = PlayerData.position.x, y = PlayerData.position.y, z = PlayerData.position.z }
        else
            camPos = { x = -206.19, y = -1013.78, z = 30.13 }
        end
        lib.notify({
            title = 'Spawned Last Location',
            description = locale.ErrorMessages.Dead_Error,
            type = 'inform'
        })
    else
        if data.label == 'Last Location' then
            if LAST_LOCATION then
                camPos = { x = PlayerData.position.x, y = PlayerData.position.y, z = PlayerData.position.z }
            else
                camPos = { x = -206.19, y = -1013.78, z = 30.13 }
            end
        else
            camPos = { x = data.x, y = data.y, z = data.z }
        end
    end
    toggleNuiFrame(false)
    local playerPed = PlayerPedId()
    FreezeEntityPosition(playerPed, true)
    SetEntityVisible(playerPed, false, 0)
    setupCameraTransition(camPos)
    if Config.Framework == "qb-core" then
        TriggerEvent('qb-clothing:client:loadPlayerClothing', PlayerData.citizenid)
    elseif Config.Framework == "esx" then
        TriggerEvent('skinchanger:loadSkin', PlayerData.skin)
    end
    FreezeEntityPosition(playerPed, false)
    SetEntityVisible(playerPed, true, 0)
end)

local function round(number)
    return math.floor(number + 0.5)
end

local function getCurrentTime()
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

local function getCurrentWeatherInfo()
    local weatherId = GetPrevWeatherTypeHashName()
    local weatherMapping = {
        [916995460] = {name = "Clear", temp = 24},
        [-1750463879] = {name = "Extra Sunny", temp = 35},
        [821931868] = {name = "Clouds", temp = 16},
        [-1148613331] = {name = "Overcast", temp = 11},
        [1420204096] = {name = "Rain", temp = 9},
        [-1233681761] = {name = "Thunderstorm", temp = 5},
        [1840358669] = {name = "Clearing", temp = 12},
        [-1429616491] = {name = "Snow", temp = -2},
        [669657108] = {name = "Blizzard", temp = -7},
        [603685163] = {name = "Light Snow", temp = -4}
    }
    local weatherName = "Unknown"
    local temperature = 0
    if weatherMapping[weatherId] then
        weatherName = weatherMapping[weatherId].name
        temperature = weatherMapping[weatherId].temp
    end
    return weatherName, temperature
end

RegisterNetEvent('receiveData', function(dateString)
    local weather, temp = getCurrentWeatherInfo()
    local info = {
        time = getCurrentTime(),
        date = dateString,
        weather = weather,
        temp = temp,
        wind = round(GetWindSpeed())
    }
    SendReactMessage('updateInfo', info)
end)

CreateThread(function()
    while true do
        TriggerServerEvent('sendData')
        Wait(1000)
    end
end)