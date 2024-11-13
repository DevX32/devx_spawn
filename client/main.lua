local QBCore = exports['qb-core']:GetCoreObject()
local LastLocation = nil

local function ToggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

local function ToggleSound(state)
    if state then
        StartAudioScene("MP_LEADERBOARD_SCENE")
    else
        StopAudioScene("MP_LEADERBOARD_SCENE")
    end
end

local function ClearScreen()
    SetCloudHatOpacity(0.01)
    SetDrawOrigin(0.0, 0.0, 0.0, 0)
end

local function InitialSetup()
    ToggleSound(true)
    SwitchOutPlayer(PlayerPedId(), 0, 1)
end

local function SetupCameraTransition(camPos)
    ClearScreen()
    local Cam1 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", camPos.x, camPos.y, camPos.z + 1000, 300.00, 0.00, 0.00, 110.00, false, 0)
    local Cam2 = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", camPos.x, camPos.y, camPos.z + 50, 300.00, 0.00, 0.00, 110.00, false, 0)
    PointCamAtCoord(Cam1, camPos.x, camPos.y, camPos.z + 75)
    SetCamActiveWithInterp(Cam1, Cam2, 500, true, true)
    if DoesCamExist(Cam2) then
        DestroyCam(Cam2, true)
    end
    Wait(500)
    PointCamAtCoord(Cam2, camPos.x, camPos.y, camPos.z + 0)
    SetCamActiveWithInterp(Cam2, Cam2, 1000, true, true)
    SetEntityCoords(PlayerPedId(), camPos.x, camPos.y, camPos.z)
    DoScreenFadeOut(500)
    Wait(2000)
    FreezeEntityPosition(PlayerPedId(), false)
    RenderScriptCams(false, true, 500, true, true)
    SetCamActive(Cam1, false)
    DestroyCam(Cam1, true)
    SetCamActive(Cam2, false)
    DestroyCam(Cam2, true)
    SetEntityVisible(PlayerPedId(), true)
    Wait(500)
    DoScreenFadeIn(250)
end

RegisterNetEvent('devx_spawn:initInterface', function()
    DoScreenFadeOut(250)
    Wait(1000)
    DoScreenFadeIn(250)
    ToggleNuiFrame(true)
    SendReactMessage('setLocations', Config.Locations)
    PlayerData = QBCore.Functions.GetPlayerData()
    if PlayerData then
        LastLocation = vec3(PlayerData.position.x, PlayerData.position.y, PlayerData.position.z)
    end
    InitialSetup()
    local Camera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", -206.19, -1013.78, 30.13 + 1000, -85.00, 0.00, 0.00, 100.00, false, 0)
    SetCamActive(Camera, true)
    RenderScriptCams(true, false, 1, true, true)
end)

RegisterNUICallback('hideFrame', function(_, cb)
    ToggleNuiFrame(false)
    cb({})
end)

RegisterNUICallback('spawnCharacter', function(data)
    local CamPos
    PlayerData = QBCore.Functions.GetPlayerData()
    local IsDead = IsEntityDead(PlayerPedId())
    if IsDead and Config.ForceLastLocation then
        if LastLocation then
            CamPos = { x = PlayerData.position.x, y = PlayerData.position.y, z = PlayerData.position.z }
        else
            CamPos = { x = -206.19, y = -1013.78, z = 30.13 }
        end
        lib.notify({
            title = 'Spawned Last Location',
            description = 'Since you are dead, you are spawned at last location!',
            type = 'inform'
        })
    else
        if data.label == 'Last Location' then
            if LastLocation then
                CamPos = { x = PlayerData.position.x, y = PlayerData.position.y, z = PlayerData.position.z }
            else
                CamPos = { x = -206.19, y = -1013.78, z = 30.13 }
            end
        else
            CamPos = { x = data.x, y = data.y, z = data.z }
        end
    end
    ToggleNuiFrame(false)
    local PlayerPed = PlayerPedId()
    FreezeEntityPosition(PlayerPed, true)
    SetEntityVisible(PlayerPed, false, 0)
    SetupCameraTransition(CamPos)
    TriggerEvent('qb-clothing:client:loadPlayerClothing', PlayerData.citizenid)
    FreezeEntityPosition(PlayerPed, false)
    SetEntityVisible(PlayerPed, true, 0)
end)

local function Round(number)
    return math.floor(number + 0.5)
end

local function GetCurrentTime()
    local Hour = GetClockHours()
    local Minute = GetClockMinutes()
    local AmPm = "AM"
    if Hour >= 12 then
        AmPm = "PM"
        if Hour > 12 then
            Hour = Hour - 12
        end
    end
    return string.format("%02d:%02d %s", Hour, Minute, AmPm)
end

local function GetCurrentWeatherInfo()
    local WeatherId = GetPrevWeatherTypeHashName()
    local WeatherMapping = {
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
    local WeatherName = "Unknown"
    local Temperature = 0
    if WeatherMapping[WeatherId] then
        WeatherName = WeatherMapping[WeatherId].name
        Temperature = WeatherMapping[WeatherId].temp
    end
    return WeatherName, Temperature
end

RegisterNetEvent('receiveData', function(dateString)
    local Weather, Temp = GetCurrentWeatherInfo()
    local Info = {
        time = GetCurrentTime(),
        date = dateString,
        weather = Weather,
        temp = Temp,
        wind = Round(GetWindSpeed())
    }
    SendReactMessage('updateInfo', Info)
end)

CreateThread(function()
    while true do
        TriggerServerEvent('sendData')
        Wait(1000)
    end
end)