local camZPlus1 = 1000
local camZPlus2 = 50
local pointCamCoords = 75
local pointCamCoords2 = 0
local cam1Time = 500
local cam2Time = 1000
local LastLocation = nil

if Config.Framework == "qb-core" then
    QBCore = exports['qb-core']:GetCoreObject()
elseif Config.Framework == "esx" then
    ESX = exports.es_extended:getSharedObject()
end

local function ToggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

local cloudOpacity = 0.01
local muteSound = true

function ToggleSound(state)
    if state then
        StartAudioScene("MP_LEADERBOARD_SCENE")
    else
        StopAudioScene("MP_LEADERBOARD_SCENE")
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

local function SetCam(campos)
    local cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", campos.x, campos.y, campos.z + camZPlus1, 300.00,0.00,0.00, 110.00, false, 0)
    local cam2 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", campos.x, campos.y, campos.z + camZPlus2, 300.00,0.00,0.00, 110.00, false, 0)
    PointCamAtCoord(cam, campos.x, campos.y, campos.z + pointCamCoords)
    SetCamActiveWithInterp(cam, cam2, cam1Time, true, true)
    if DoesCamExist(cam2) then
        DestroyCam(cam2, true)
    end
    Wait(cam1Time)
    PointCamAtCoord(cam2, campos.x, campos.y, campos.z + pointCamCoords2)
    SetCamActiveWithInterp(cam2, cam2, cam2Time, true, true)
    SetEntityCoords(PlayerPedId(), campos.x, campos.y, campos.z)
    DoScreenFadeOut(500)
    Wait(2000)
    FreezeEntityPosition(PlayerPedId(), false)
    RenderScriptCams(false, true, 500, true, true)
    SetCamActive(cam, false)
    DestroyCam(cam, true)
    SetCamActive(cam2, false)
    DestroyCam(cam2, true)
    SetEntityVisible(PlayerPedId(), true)
    Wait(500)
    DoScreenFadeIn(250)
end

RegisterNetEvent('devx_spawn:client:openUI', function()
    DoScreenFadeOut(250)
    Wait(1000)
    DoScreenFadeIn(250)
    ToggleNuiFrame(true)
    SendReactMessage('setLocations', Config.Locations)
    if Config.Framework == "qb-core" then
        PlayerData = QBCore.Functions.GetPlayerData()
    elseif Config.Framework == "esx" then
        PlayerData = ESX.GetPlayerData()
    end
    if PlayerData then
        LastLocation = vec3(PlayerData.position.x, PlayerData.position.y, PlayerData.position.z)
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

RegisterNUICallback('spawnCharacter', function(data)
    local camPos
    if Config.Framework == "qb-core" then
        PlayerData = QBCore.Functions.GetPlayerData()
    elseif Config.Framework == "esx" then
        PlayerData = ESX.GetPlayerData()
    end
    if data.label == 'Last Location' then
        if LastLocation then
            camPos = { x = PlayerData.position.x, y = PlayerData.position.y, z = PlayerData.position.z }
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